<template>
  <div class="file-uploader">
    <!-- File Input with Label -->
    <label
      v-if="!currentFile"
      class="flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-4 hover:bg-primary/5"
      :class="{ 'border-primary': isDragging, 'border-muted': !isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <div class="flex flex-col items-center justify-center gap-2">
        <Icon
          name="heroicons:document-arrow-up"
          class="h-8 w-8 text-primary/70"
        />
        <span class="text-sm font-medium text-muted-foreground">
          {{
            selectedFile
              ? selectedFile.name
              : "Drag file here or click to browse"
          }}
        </span>
        <span v-if="!selectedFile" class="text-xs text-muted-foreground">
          {{ acceptLabel }} (Max: {{ formatFileSize(maxFileSize) }})
        </span>
      </div>

      <input
        type="file"
        class="hidden"
        :accept="accept"
        @change="handleFileSelect"
      />
    </label>

    <!-- Current File Display (either existing or newly uploaded) -->
    <div
      v-if="currentFile"
      class="mt-2 flex items-center justify-between rounded-md border p-4"
    >
      <div class="flex items-center gap-2">
        <Icon :name="fileIcon" class="h-5 w-5 text-primary" />
        <a
          v-if="currentFile.file_download_url"
          :href="currentFile.file_download_url"
          target="_blank"
          class="text-sm font-medium text-primary hover:underline"
        >
          {{ currentFile.original_filename }}
        </a>
        <span v-else class="text-sm font-medium text-muted-foreground">
          {{ currentFile.original_filename }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <UButton size="sm" color="error" @click="clearFile">Remove</UButton>
        <UButton
          v-if="selectedFile"
          size="sm"
          color="primary"
          :disabled="isUploading"
          @click="uploadFile"
        >
          {{ isUploading ? "Uploading..." : "Upload" }}
        </UButton>
      </div>
    </div>

    <!-- Progress Bar -->
    <div v-if="isUploading" class="mt-2 w-full">
      <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div class="animate-indeterminate h-full bg-primary" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SecureFile } from "#types/api_interfaces";

const props = defineProps({
  accept: {
    type: String,
    default: ".pdf,.doc,.docx",
  },
  maxFileSize: {
    type: Number,
    default: 5 * 1024 * 1024, // 5 MB limit for contract documents
  },
  description: {
    type: String,
    required: true,
  },
  existingFile: {
    type: Object as PropType<SecureFile | null>,
    default: null,
  },
});

const emit = defineEmits<{
  "upload-complete": [file: SecureFile]; // Specify the type of the emitted file
  "file-removed": []; // Emit when file is removed
}>();

const api = useApiInstance();

const selectedFile = ref<File | null>(null);
const isUploading = ref(false);
const isDragging = ref(false);
const currentFile = ref<SecureFile | null>(props.existingFile);

// Watch for changes in existingFile prop
watch(
  () => props.existingFile,
  (newFile) => {
    currentFile.value = newFile;
  }
);

// Compute a friendly label for accepted file types
const acceptLabel = computed(() => {
  if (props.accept === ".pdf,.doc,.docx") return "PDF or Word documents";
  if (props.accept === ".jpg,.jpeg,.png") return "JPG or PNG images";
  return `Accepted formats: ${props.accept}`;
});

// Determine icon based on file type
const fileIcon = computed(() => {
  const fileName =
    currentFile.value?.original_filename || selectedFile.value?.name || "";
  const lowerFileName = fileName.toLowerCase();
  if (lowerFileName.endsWith(".pdf")) return "heroicons:document-text";
  if (lowerFileName.endsWith(".doc") || lowerFileName.endsWith(".docx"))
    return "heroicons:document-text";
  return "heroicons:document";
});

// Format file size to human-readable format
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Handle file selection from input
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    validateAndSetFile(input.files[0] as File);
  }
};

// Handle file drop
const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    validateAndSetFile(event.dataTransfer.files[0] as File);
  }
};

// Validate file and set if valid
const validateAndSetFile = (file: File) => {
  // Check file size
  if (file.size > props.maxFileSize) {
    useToast().add({
      title: "Invalid File",
      description: `File is too large. Maximum size is ${formatFileSize(
        props.maxFileSize
      )}.`,
      color: "error",
    });
    return;
  }

  // Check file type
  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  const acceptedTypes = props.accept
    .split(",")
    .map((type) => type.trim().toLowerCase());
  if (!acceptedTypes.includes(fileExtension)) {
    useToast().add({
      title: "Invalid File",
      description: `Invalid file type. Accepted types: ${props.accept}`,
      color: "error",
    });
    return;
  }

  selectedFile.value = file;
  // Create a temporary file object to show immediately
  currentFile.value = {
    original_filename: file.name,
    content_type: file.type,
    file_size: file.size,
  } as SecureFile;
};

// Clear selected file
const clearFile = () => {
  selectedFile.value = null;
  currentFile.value = null;
  emit("file-removed");
};

// Add type for API error response
interface APIError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

// Upload the file
const uploadFile = async () => {
  if (!selectedFile.value) return;

  isUploading.value = true;

  try {
    const formData = new FormData();
    formData.append("file", selectedFile.value);
    formData.append("description", props.description);

    const response = await api<SecureFile>("/files/", {
      method: "POST",
      body: formData,
    });

    currentFile.value = response;
    selectedFile.value = null;

    useToast().add({
      title: "Success",
      description: "File uploaded successfully",
      color: "success",
    });

    emit("upload-complete", response);
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Upload error:", error);
    useToast().add({
      title: "Upload Failed",
      description:
        apiError.response?.data?.detail || "Upload failed. Please try again.",
      color: "error",
    });
  } finally {
    isUploading.value = false;
  }
};
</script>

<style>
.animate-indeterminate {
  animation: indeterminate 1s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes indeterminate {
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}
</style>

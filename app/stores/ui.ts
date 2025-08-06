export const useUiStore = defineStore("ui", {
  state: () => ({ loading: false, loadingMessage: "Loading..." }),
  actions: {
    setLoading(val: boolean) {
      this.loading = val;
    },
    setLoadingMessage(val: string) {
      this.loadingMessage = val;
    },
  },
});

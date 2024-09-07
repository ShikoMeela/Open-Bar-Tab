import jsPDF from "jspdf";
import type { Product } from "~/models/product";

export const useOpenBarStore = defineStore("open-bar", {
  state: () => ({
    isLoading: false,
    initializeTab: false,
    totalRounds: 0,
    numberOfPeople: 0,
    selectedProducts: [] as Product[],
    submittedTabs: [] as Product[],
  }),
  getters: {
    averagePerPerson: (state: any) => {
      return (state.billTotal / Number(state.numberOfPeople)).toFixed(2);
    },
    viewBill: (state: any) => {
      return state.submittedTabs.length > 0;
    },
    viewAddRound: (state: any) => {
      return state.selectedProducts.length > 0;
    },
    billTotal: (state: any) => {
      let sum: number = 0;
      state.submittedTabs.map((item: Product) => {
        sum += item.price * (item?.quantity ?? 1);
      });

      return sum.toFixed(2);
    },
  },
  actions: {
    changeInitializeTab(initializeTab: boolean) {
      this.initializeTab = initializeTab;
    },
    changeNumberOfPeople(value: number) {
      this.numberOfPeople = value;
    },
    changeIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    isSelected(id: number) {
      const selected = this.selectedProducts.find((item: Product) => item.id == id);
      if (selected) {
        return true;
      }

      return false;
    },
    getProductQuantity(id: number) {
      const quantity = this.selectedProducts.find((item: Product) => item.id == id)?.quantity;
      if (quantity) {
        return quantity;
      }

      return 0;
    },
    addProduct(product: Product) {
      this.selectedProducts.push({ ...product, quantity: 1 });
    },
    increaseQuantity(id: number) {
      const products = this.selectedProducts;
      const productIndex = products.findIndex((item: Product) => item.id == id);

      if (
        productIndex !== -1 &&
        this.selectedProducts[productIndex]?.quantity
      ) {
        this.selectedProducts[productIndex].quantity += 1;
        return;
      }
    },
    decreaseQuantity(id: number) {
      const products = this.selectedProducts;
      const productIndex = products.findIndex((item: Product) => item.id == id);

      if (productIndex !== -1 && this.selectedProducts[productIndex].quantity) {
        if (this.selectedProducts[productIndex].quantity - 1 === 0) {
          this.selectedProducts.splice(productIndex, 1);
          return;
        }
        this.selectedProducts[productIndex].quantity -= 1;
      }
    },
    addRound() {
      let submittedRound: Product[] = [];
      this.selectedProducts.map((item: Product) => {
        submittedRound.push({ ...item, round: this.totalRounds + 1 });
      });

      this.totalRounds += 1;
      this.submittedTabs = [...this.submittedTabs, ...submittedRound];
      this.selectedProducts = [];
    },
    exportToCSV() {
      let csv = "Beverage;Round;Quantity;Total Price\n";
      this.submittedTabs.forEach((row: any) => {
        csv += `${row.name};`;
        csv += `${row.round};`;
        csv += `${row.quantity};`;
        csv += `R${row.price}`;
        csv += "\n";
      });

      csv += "\n";
      csv += "Overall Total\n";
      csv += `R${this.billTotal} \n`;
      if (Number(this.numberOfPeople) > 0) {
        csv += "Average Per Person\n";
        csv += `R${this.averagePerPerson} \n`;
      }

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = "bill.csv";
      anchor.click();
    },
    exportPDF() {
      const doc = new jsPDF();

      const elementHTML = document.querySelector("#billTable") as any;
      doc.html(elementHTML, {
        callback: function (doc: any) {
          doc.save("bill.pdf");
        },
        x: 15,
        y: 15,
        width: 170,
        windowWidth: 650,
      });
    },
  },
});

import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Register custom font for premium feel (if available, fallback to Helvetica)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/700.woff2', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    color: "#1F2937", // Charcoal
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: "#B91C1C", // Deep Red
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B91C1C",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  billTo: {
    width: "50%",
  },
  label: {
    color: "#9CA3AF",
    textTransform: "uppercase",
    fontSize: 8,
    marginBottom: 4,
    letterSpacing: 1,
  },
  value: {
    fontWeight: "bold",
    fontSize: 12,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 10,
    fontWeight: "bold",
    color: "#4B5563",
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: "#E5E7EB",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: "#F3F4F6",
  },
  descCol: { width: "60%" },
  qtyCol: { width: "10%", textAlign: "center" },
  priceCol: { width: "15%", textAlign: "right" },
  totalCol: { width: "15%", textAlign: "right" },
  totalsContainer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopStyle: 'solid',
    borderTopColor: "#F3F4F6",
    alignItems: "flex-end",
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 8,
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: "#1F2937",
    fontWeight: "bold",
    fontSize: 14,
    color: "#B91C1C",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 2,
  }
});

interface InvoicePDFProps {
  data: any;
}

const PDFTemplate = ({ data }: InvoicePDFProps) => {
  const { clientName, clientAddress, invoiceDate, dueDate, items, taxRate = 18 } = data;
  
  const subtotal = items.reduce((acc: number, item: any) => acc + (item.quantity * item.unitPrice), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>TWENDE</Text>
            <Text style={{ fontSize: 8, color: "#9CA3AF", letterSpacing: 3 }}>DOCUMENTS ARCHITECT</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>INVOICE</Text>
            <Text style={{ color: "#9CA3AF" }}>#INV-{new Date().getTime().toString().slice(-6)}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.detailsContainer}>
          <View style={styles.billTo}>
            <Text style={styles.label}>Bill To:</Text>
            <Text style={styles.value}>{clientName || "Client Name"}</Text>
            <Text style={{ color: "#4B5563", marginTop: 4, width: 200 }}>{clientAddress || "Client Address"}</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.label}>Issue Date:</Text>
              <Text style={styles.value}>{invoiceDate || "YYYY-MM-DD"}</Text>
            </View>
            <View>
              <Text style={styles.label}>Due Date:</Text>
              <Text style={styles.value}>{dueDate || "YYYY-MM-DD"}</Text>
            </View>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.descCol}>Description</Text>
            <Text style={styles.qtyCol}>Qty</Text>
            <Text style={styles.priceCol}>Unit Price</Text>
            <Text style={styles.totalCol}>Total</Text>
          </View>
          {items.map((item: any, i: number) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.descCol}>{item.description || "Service Item"}</Text>
              <Text style={styles.qtyCol}>{item.quantity || 1}</Text>
              <Text style={styles.priceCol}>{item.unitPrice?.toLocaleString() || 0}</Text>
              <Text style={styles.totalCol}>{(item.quantity * item.unitPrice)?.toLocaleString() || 0}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalLine}>
            <Text style={{ color: "#9CA3AF" }}>Subtotal:</Text>
            <Text style={{ fontWeight: "bold" }}>TSh {subtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.totalLine}>
            <Text style={{ color: "#9CA3AF" }}>VAT ({taxRate}%):</Text>
            <Text style={{ fontWeight: "bold" }}>TSh {tax.toLocaleString()}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text>Total Payable:</Text>
            <Text>TSh {total.toLocaleString()}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Generated via Twende Documents Precision Engine</Text>
      </Page>
    </Document>
  );
};

export default PDFTemplate;

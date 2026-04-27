import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/roboto/Roboto-Regular.ttf" },
    { src: "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/roboto/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#374151",
  },
  header: {
    backgroundColor: "#B91C1C", // redMain
    padding: 30,
    margin: -50,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  col: {
    width: "48%",
  },
  label: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#9CA3AF",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableHeader: {
    backgroundColor: "#F9FAFB",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 8,
    flex: 1,
  },
  tableCellNarrow: {
    padding: 8,
    width: 60,
    textAlign: "right",
  },
  totalSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalBox: {
    width: 200,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#B91C1C",
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B91C1C",
    textAlign: "right",
    marginTop: 5,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 8,
    color: "#9CA3AF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  }
});

interface ProformaPDFProps {
  data: {
    clientName: string;
    clientAddress: string;
    invoiceDate: string;
    items: Array<{
      description: string;
      quantity: number;
      unitPrice: number;
    }>;
  };
}

const ProformaPDF: React.FC<ProformaPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>PROFORMA INVOICE</Text>
            <Text style={{ fontSize: 10, opacity: 0.8 }}>Professional Service Billing</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={{ fontWeight: "bold" }}>SmartDocs Platform</Text>
            <Text style={{ fontSize: 8 }}>Service & Print Hub</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.col}>
            <Text style={styles.label}>Bill To:</Text>
            <Text style={styles.sectionTitle}>{data.clientName || "Client Name"}</Text>
            <Text>{data.clientAddress || "Client Address"}</Text>
          </View>
          <View style={[styles.col, { textAlign: "right" }]}>
            <Text style={styles.label}>Invoice Date:</Text>
            <Text style={styles.sectionTitle}>{data.invoiceDate}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCell}><Text>Description</Text></View>
            <View style={styles.tableCellNarrow}><Text>Qty</Text></View>
            <View style={styles.tableCellNarrow}><Text>Price</Text></View>
            <View style={styles.tableCellNarrow}><Text>Total</Text></View>
          </View>
          {data.items.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <View style={styles.tableCell}><Text>{item.description}</Text></View>
              <View style={styles.tableCellNarrow}><Text>{item.quantity}</Text></View>
              <View style={styles.tableCellNarrow}><Text>{item.unitPrice.toLocaleString()}</Text></View>
              <View style={styles.tableCellNarrow}><Text>{(item.quantity * item.unitPrice).toLocaleString()}</Text></View>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Grand Total Amount:</Text>
            <Text style={styles.totalAmount}>TSh {calculateTotal().toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          This is a proforma invoice and not a final bill. Payment terms apply. 
          Thank you for choosing SmartDocs.
        </Text>
      </Page>
    </Document>
  );
};

export default ProformaPDF;

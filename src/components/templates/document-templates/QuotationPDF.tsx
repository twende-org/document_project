import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts if available, or fallback to standard ones
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#B91C1C", // redMain
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B91C1C",
  },
  companyInfo: {
    textAlign: "right",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#B91C1C",
    textTransform: "uppercase",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  col: {
    width: "48%",
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
    textAlign: "right",
    borderTopWidth: 2,
    borderTopColor: "#B91C1C",
    paddingTop: 10,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B91C1C",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 8,
    color: "#9CA3AF",
    fontStyle: "italic",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  }
});

interface QuotationPDFProps {
  data: {
    clientName: string;
    clientAddress: string;
    quotationDate: string;
    expiryDate: string;
    items: Array<{
      description: string;
      quantity: number;
      unitPrice: number;
    }>;
  };
}

const QuotationPDF: React.FC<QuotationPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>QUOTATION</Text>
            <Text># QT-{Math.floor(Math.random() * 10000)}</Text>
          </View>
          <View style={styles.companyInfo}>
            <Text style={{ fontWeight: "bold" }}>SmartDocs Platform</Text>
            <Text>Service & Print Hub</Text>
            <Text>Dar es Salaam, Tanzania</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Bill To:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>{data.clientName || "Client Name"}</Text>
            <Text>{data.clientAddress || "Client Address"}</Text>
          </View>
          <View style={[styles.col, { textAlign: "right" }]}>
            <Text style={styles.sectionTitle}>Quote Details:</Text>
            <Text>Date: {data.quotationDate}</Text>
            <Text>Valid Until: {data.expiryDate}</Text>
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
          <Text>Total Amount Due:</Text>
          <Text style={styles.totalAmount}>TSh {calculateTotal().toLocaleString()}</Text>
        </View>

        <Text style={styles.footer}>
          * This quotation is generated electronically and is valid until the indicated expiry date. Terms & conditions apply.
        </Text>
      </Page>
    </Document>
  );
};

export default QuotationPDF;

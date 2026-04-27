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
    padding: 60,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#111827",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#B91C1C",
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B91C1C",
    textTransform: "uppercase",
  },
  subject: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  partySection: {
    padding: 10,
    backgroundColor: "#F9FAFB",
    borderLeftWidth: 3,
    borderLeftColor: "#FEE2E2",
    marginBottom: 15,
  },
  bold: {
    fontWeight: "bold",
  },
  term: {
    marginBottom: 10,
    textAlign: "justify",
  },
  signatureGrid: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    borderTopWidth: 1,
    borderTopColor: "#9CA3AF",
    paddingTop: 10,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 60,
    right: 60,
    textAlign: "center",
    fontSize: 8,
    color: "#9CA3AF",
    fontStyle: "italic",
  }
});

interface ContractPDFProps {
  data: {
    partyAName: string;
    partyAAddress: string;
    partyBName: string;
    partyBAddress: string;
    contractSubject: string;
    terms: string[];
    date: string;
  };
}

const ContractPDF: React.FC<ContractPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Legal Agreement / Contract</Text>
          <Text style={styles.subject}>{data.contractSubject || "SUBJECT OF AGREEMENT"}</Text>
        </View>

        <View style={styles.section}>
          <Text>This CONTRACT is made on this <Text style={styles.bold}>{data.date}</Text> BETWEEN:</Text>
        </View>

        <View style={styles.partySection}>
          <Text><Text style={styles.bold}>{data.partyAName || "1st PARTY NAME"}</Text> of {data.partyAAddress || "1st PARTY ADDRESS"} (hereinafter called the 'First Party')</Text>
          <Text style={{ textAlign: "center", marginVertical: 5, fontSize: 8 }}>AND</Text>
          <Text><Text style={styles.bold}>{data.partyBName || "2nd PARTY NAME"}</Text> of {data.partyBAddress || "2nd PARTY ADDRESS"} (hereinafter called the 'Second Party')</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.bold, { marginBottom: 10 }]}>Witnessed and agreed that:</Text>
          {data.terms.map((term, idx) => (
            <Text key={idx} style={styles.term}>
              {idx + 1}. {term || "____________________________________________________________"}
            </Text>
          ))}
        </View>

        <View style={styles.signatureGrid}>
          <View style={styles.signatureBox}>
            <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>{data.partyAName || "First Party"}</Text>
            <Text style={{ fontSize: 8, marginTop: 40 }}>Signature</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>{data.partyBName || "Second Party"}</Text>
            <Text style={{ fontSize: 8, marginTop: 40 }}>Signature</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          This document represents the full agreement between the parties mentioned above.
        </Text>
      </Page>
    </Document>
  );
};

export default ContractPDF;

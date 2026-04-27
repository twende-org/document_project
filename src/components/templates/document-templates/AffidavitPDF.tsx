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
    fontSize: 11,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#B91C1C",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 9,
    color: "#6B7280",
    marginTop: 5,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  statement: {
    marginBottom: 12,
    textAlign: "justify",
  },
  signatureSection: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    borderTopWidth: 1,
    borderTopColor: "#9CA3AF",
    paddingTop: 10,
  },
  stampBox: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#FEE2E2",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  stampText: {
    fontSize: 8,
    color: "#FECACA",
    textAlign: "center",
    fontWeight: "bold",
  }
});

interface AffidavitPDFProps {
  data: {
    deponentName: string;
    deponentAddress: string;
    deponentOccupation: string;
    statements: string[];
    date: string;
  };
}

const AffidavitPDF: React.FC<AffidavitPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Affidavit</Text>
          <Text style={styles.subtitle}>IN THE MATTER OF THE OATHS AND STATUTORY DECLARATIONS ACT</Text>
        </View>

        <View style={styles.section}>
          <Text>
            I, <Text style={styles.boldText}>{data.deponentName || "____________________"}</Text>, 
            a {data.deponentOccupation || "____________________"} and resident of 
            {data.deponentAddress || "____________________"} do hereby make oath and state as follows:
          </Text>
        </View>

        <View style={styles.section}>
          {data.statements.map((stmt, idx) => (
            <Text key={idx} style={styles.statement}>
              {idx + 1}. {stmt || "____________________________________________________________"}
            </Text>
          ))}
          <Text style={styles.statement}>
            {data.statements.length + 1}. That what is stated hereinabove is true to the best of my knowledge, information, and belief.
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={{ fontStyle: "italic", fontSize: 9 }}>SWORN by the said</Text>
            <Text style={[styles.boldText, { marginTop: 20 }]}>{data.deponentName || "DEPONENT NAME"}</Text>
            <Text style={{ fontSize: 8, textTransform: "uppercase", marginTop: 2 }}>Deponent</Text>
          </View>
          
          <View style={{ width: "45%", alignItems: "flex-end" }}>
            <Text style={{ fontStyle: "italic", fontSize: 9, marginBottom: 10 }}>Before me,</Text>
            <View style={styles.stampBox}>
              <Text style={styles.stampText}>COMMISSIONER{"\n"}FOR OATHS{"\n"}STAMP</Text>
            </View>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>Date: {data.date}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AffidavitPDF;

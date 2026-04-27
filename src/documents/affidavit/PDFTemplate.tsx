import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 12,
    color: "#1F2937",
    fontFamily: "Helvetica",
    lineHeight: 1.8,
  },
  header: {
    marginBottom: 40,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 4,
    marginBottom: 10,
    color: "#1F2937"
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: "#B91C1C",
    marginHorizontal: "auto",
    marginBottom: 20
  },
  subTitle: {
    fontSize: 9,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 2,
    maxWidth: 300,
    marginHorizontal: "auto",
    textAlign: "center"
  },
  intro: {
    marginBottom: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    borderLeftWidth: 3,
    borderLeftStyle: 'solid',
    borderLeftColor: "#B91C1C",
    paddingLeft: 15
  },
  statementRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  statementNumber: {
    width: 30,
    fontWeight: "bold",
    color: "#B91C1C"
  },
  statementText: {
    flex: 1,
    textAlign: "justify"
  },
  signatureSection: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  signatureBox: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: "#1F2937",
    paddingBottom: 5,
    marginBottom: 5
  },
  signatureLabel: {
    fontSize: 9,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  stampBox: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: "#F3F4F6",
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA"
  },
  stampText: {
    fontSize: 7,
    color: "#E5E7EB",
    textTransform: "uppercase",
    textAlign: "center",
    transform: "rotate(-45deg)"
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 60,
    right: 60,
    textAlign: "center",
    color: "#E5E7EB",
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 3
  }
});

interface AffidavitData {
  deponentName: string;
  deponentAddress: string;
  deponentOccupation: string;
  statements: string[];
  date: string;
}

const AffidavitPDFTemplate = ({ data }: { data: AffidavitData }) => {
  const { 
    deponentName = "____________________",
    deponentAddress = "____________________",
    deponentOccupation = "____________________",
    statements = [],
    date = new Date().toLocaleDateString()
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Affidavit</Text>
          <View style={styles.divider} />
          <Text style={styles.subTitle}>
            In the Matter of the Oaths and Statutory Declarations Act (Chapter 15, Laws of Tanzania)
          </Text>
        </View>

        <View style={styles.intro}>
          <Text>
            I, {deponentName}, a {deponentOccupation} and resident of {deponentAddress} do hereby make oath and state as follows:
          </Text>
        </View>

        <View>
          {statements.map((stmt, idx) => (
            <View key={idx} style={styles.statementRow}>
              <Text style={styles.statementNumber}>{idx + 1}.</Text>
              <Text style={styles.statementText}>{stmt}</Text>
            </View>
          ))}
          
          <View style={styles.statementRow}>
            <Text style={styles.statementNumber}>{statements.length + 1}.</Text>
            <Text style={styles.statementText}>
              That what is stated hereinabove is true to the best of my knowledge, information, and belief.
            </Text>
          </View>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Sworn by the said deponent:</Text>
            <View style={{ height: 40 }} />
            <View style={styles.signatureLine}>
              <Text style={{ fontWeight: "bold" }}>{deponentName.toUpperCase()}</Text>
            </View>
            <Text style={styles.signatureLabel}>Deponent</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <View style={styles.stampBox}>
              <Text style={styles.stampText}>Commissioner{"\n"}For Oaths{"\n"}Stamp</Text>
            </View>
            <Text style={{ fontSize: 10, marginTop: 10, fontWeight: "bold" }}>Date: {date}</Text>
          </View>
        </View>

        <Text style={styles.footer}>Precision Legal Architect • Twende Documents</Text>
      </Page>
    </Document>
  );
};

export default AffidavitPDFTemplate;

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

const AffidavitPDFTemplate = ({ data, settings }: { data: AffidavitData, settings?: any }) => {
  const { 
    deponentName = "____________________",
    deponentAddress = "____________________",
    deponentOccupation = "____________________",
    statements = [],
    date = new Date().toLocaleDateString()
  } = data;

  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const isCompact = settings?.layout === 'compact';
  const isModern = settings?.layout === 'modern';
  const isElegant = settings?.layout === 'elegant';

  return (
    <Document>
      <Page size="A4" style={[styles.page, isCompact ? { padding: 40 } : {}]}>
        <View style={[
          styles.header, 
          isCompact ? { marginBottom: 20 } : {},
          isModern ? { borderBottomWidth: 2, borderBottomColor: primaryColor, paddingBottom: 20 } : {},
          isElegant ? { borderStyle: 'solid', borderWidth: 2, borderColor: primaryColor, padding: 20, marginBottom: 50 } : {}
        ]}>
          <Text style={[
            styles.title, 
            isModern ? { fontSize: 28, color: primaryColor } : {},
            isElegant ? { color: primaryColor, letterSpacing: 8 } : {}
          ]}>Affidavit</Text>
          {!isElegant && <View style={[styles.divider, { backgroundColor: primaryColor }, isModern ? { width: 100, height: 4 } : {}]} />}
          <Text style={[styles.subTitle, isElegant ? { color: '#666', borderTopWidth: 1, borderTopColor: primaryColor + '40', paddingTop: 10, marginTop: 10 } : {}]}>
            In the Matter of the Oaths and Statutory Declarations Act (Chapter 15, Laws of Tanzania)
          </Text>
        </View>

        <View style={[
          styles.intro, 
          { borderLeftColor: primaryColor }, 
          isCompact ? { marginBottom: 15 } : {},
          isModern ? { backgroundColor: '#F9FAFB', padding: 20, borderLeftWidth: 5 } : {}
        ]}>
          <Text style={isCompact ? { fontSize: 10 } : {}}>
            I, {deponentName}, a {deponentOccupation} and resident of {deponentAddress} do hereby make oath and state as follows:
          </Text>
        </View>

        <View>
          {statements.map((stmt, idx) => (
            <View key={idx} style={[
              styles.statementRow, 
              isModern ? { marginBottom: 25, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' } : {}, 
              isCompact ? { marginBottom: 8 } : {}
            ]}>
              <Text style={[styles.statementNumber, { color: primaryColor }, isCompact ? { fontSize: 10 } : {}]}>{idx + 1}.</Text>
              <Text style={[styles.statementText, isCompact ? { fontSize: 10 } : {}]}>{stmt}</Text>
            </View>
          ))}
          
          <View style={[styles.statementRow, isCompact ? { marginBottom: 8 } : {}]}>
            <Text style={[styles.statementNumber, { color: primaryColor }, isCompact ? { fontSize: 10 } : {}]}>{statements.length + 1}.</Text>
            <Text style={[styles.statementText, isCompact ? { fontSize: 10 } : {}]}>
              That what is stated hereinabove is true to the best of my knowledge, information, and belief.
            </Text>
          </View>
        </View>

        <View style={[
          styles.signatureSection, 
          isCompact ? { marginTop: 30 } : {},
          isModern ? { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 30 } : {}
        ]}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Sworn by the said deponent:</Text>
            <View style={{ height: isCompact ? 20 : 40 }} />
            <View style={[styles.signatureLine, isModern ? { borderBottomColor: primaryColor } : {}]}>
              <Text style={{ fontWeight: "bold", fontSize: isCompact ? 10 : 12 }}>{deponentName.toUpperCase()}</Text>
            </View>
            <Text style={styles.signatureLabel}>Deponent</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <View style={[
              styles.stampBox, 
              isCompact ? { width: 80, height: 80 } : {},
              isModern ? { borderColor: primaryColor + '20', backgroundColor: 'white' } : {}
            ]}>
              <Text style={[styles.stampText, { color: primaryColor + '40' }, isCompact ? { fontSize: 5 } : {}]}>Commissioner{"\n"}For Oaths{"\n"}Stamp</Text>
            </View>
            <Text style={{ fontSize: isCompact ? 8 : 10, marginTop: 10, fontWeight: "bold" }}>Date: {date}</Text>
          </View>
        </View>

        <Text style={styles.footer}>Precision Legal Architect • Twende Documents</Text>
      </Page>
    </Document>
  );
};

export default AffidavitPDFTemplate;

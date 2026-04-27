import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { LetterContent } from "../types";

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 11,
    color: "#1F2937",
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 40,
    borderBottom: 1,
    borderColor: "#E5E7EB",
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B91C1C",
    letterSpacing: 2
  },
  senderInfo: {
    textAlign: "right",
    fontSize: 9,
    color: "#4B5563"
  },
  date: {
    marginBottom: 30,
    fontWeight: "bold"
  },
  recipientInfo: {
    marginBottom: 30,
  },
  recipientName: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 2
  },
  subject: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#B91C1C",
    textTransform: "uppercase",
    marginBottom: 25,
    borderBottom: 1,
    borderColor: "#B91C1C",
    paddingBottom: 5,
    width: "100%"
  },
  salutation: {
    marginBottom: 15,
    fontWeight: "bold"
  },
  body: {
    marginBottom: 40,
    textAlign: "justify"
  },
  closing: {
    marginTop: 40,
  },
  signature: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 12
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 60,
    right: 60,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 2,
    borderTop: 1,
    borderColor: "#F3F4F6",
    paddingTop: 10
  }
});

const PDFTemplate = ({ data }: { data: LetterContent }) => {
  const { 
    senderName,
    recipientName, recipientAddress,
    date = new Date().toLocaleDateString(),
    subject,
    body,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
           <View>
              <Text style={styles.logo}>TWENDE</Text>
              <Text style={{ fontSize: 7, color: "#9CA3AF", letterSpacing: 2 }}>OFFICIAL CORRESPONDENCE</Text>
           </View>
           <View style={styles.senderInfo}>
              <Text style={{ fontWeight: "bold", color: "#1F2937" }}>{senderName || "Sender Name"}</Text>
           </View>
        </View>

        <Text style={styles.date}>{date}</Text>

        <View style={styles.recipientInfo}>
           <Text style={styles.recipientName}>{recipientName || "Recipient Name"}</Text>
           <Text style={{ color: "#4B5563", marginTop: 2 }}>{recipientAddress || "Recipient Address"}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
           <Text style={styles.subject}>RE: {subject || "OFFICIAL DOCUMENT SUBJECT"}</Text>
        </View>

        <Text style={styles.salutation}>Dear Sir/Madam,</Text>
        <Text style={styles.body}>
          {body || "This is where your official correspondence content will appear."}
        </Text>

        <View style={styles.closing}>
           <Text>Yours Sincerely,</Text>
           <View style={{ height: 40 }} />
           <Text style={styles.signature}>{senderName || "Sender Name"}</Text>
        </View>

        <Text style={styles.footer}>Generated via Twende Documents Official Correspondence Module</Text>
      </Page>
    </Document>
  );
};

export default PDFTemplate;

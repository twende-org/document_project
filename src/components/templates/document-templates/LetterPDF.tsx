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
    padding: 70, // Formal letter padding
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#111827",
  },
  applicantInfo: {
    marginBottom: 30,
  },
  date: {
    marginBottom: 30,
  },
  recipientInfo: {
    marginBottom: 30,
  },
  subject: {
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  body: {
    textAlign: "justify",
    marginBottom: 40,
    lineHeight: 1.8,
  },
  signature: {
    marginTop: 40,
  },
  bold: {
    fontWeight: "bold",
  }
});

interface LetterPDFProps {
  data: {
    applicantName: string;
    applicantAddress?: string;
    applicantCityStateZip?: string;
    applicantPhone?: string;
    applicantEmail?: string;
    date: string;
    hiringManager?: string;
    companyName?: string;
    companyAddress?: string;
    companyCityStateZip?: string;
    jobTitle?: string;
    professionalField?: string;
    letterContent?: string; // For custom letters or generated ones
    recipientName?: string;
    subject?: string;
  };
}

const LetterPDF: React.FC<LetterPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Applicant Details */}
        <View style={styles.applicantInfo}>
          <Text style={styles.bold}>{data.applicantName}</Text>
          {data.applicantAddress && <Text>{data.applicantAddress}</Text>}
          {data.applicantCityStateZip && <Text>{data.applicantCityStateZip}</Text>}
          {(data.applicantPhone || data.applicantEmail) && (
            <Text>{data.applicantPhone} {data.applicantPhone && data.applicantEmail ? "|" : ""} {data.applicantEmail}</Text>
          )}
        </View>

        {/* Date */}
        <View style={styles.date}>
          <Text>{data.date}</Text>
        </View>

        {/* Recipient Details */}
        <View style={styles.recipientInfo}>
          <Text>To,</Text>
          {data.hiringManager || data.recipientName ? <Text>{data.hiringManager || data.recipientName}</Text> : null}
          {data.companyName && <Text>{data.companyName}</Text>}
          {data.companyAddress && <Text>{data.companyAddress}</Text>}
          {data.companyCityStateZip && <Text>{data.companyCityStateZip}</Text>}
        </View>

        {/* Subject */}
        {(data.subject || data.jobTitle) && (
          <View style={styles.subject}>
            <Text>Subject: {data.subject || `Application for the position of ${data.jobTitle}`}</Text>
          </View>
        )}

        {/* Body */}
        <View style={styles.body}>
          <Text>{data.letterContent}</Text>
        </View>

        {/* Closing */}
        <View style={styles.signature}>
          <Text>Yours sincerely,</Text>
          <Text style={[styles.bold, { marginTop: 40 }]}>{data.applicantName}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default LetterPDF;

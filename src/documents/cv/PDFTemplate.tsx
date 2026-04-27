import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CVContent } from "../types";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    color: "#1F2937",
    fontFamily: "Helvetica",
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 180,
    backgroundColor: "#F9FAFB",
    padding: 30,
    paddingTop: 50,
  },
  main: {
    marginLeft: 150,
    paddingLeft: 40,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#B91C1C",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#B91C1C",
    borderBottom: 1,
    borderColor: "#E5E7EB",
    paddingBottom: 5,
    marginBottom: 15,
    marginTop: 25,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactItem: {
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 7,
    color: "#9CA3AF",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  experienceItem: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 3,
  },
  companyInfo: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 5,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: "#B91C1C",
    borderRadius: 50,
    marginRight: 8,
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 5,
  },
  summary: {
    lineHeight: 1.6,
    color: "#374151",
  }
});

const PDFTemplate = ({ data }: { data: CVContent }) => {
  const { personalInfo = {} as any, experience = [], education = [], skills = [] } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={{ marginBottom: 40 }}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text>{personalInfo.phone || "+255 000 000 000"}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text>{personalInfo.email || "hello@twende.com"}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text>{personalInfo.address || "Dar es Salaam, TZ"}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Expertise</Text>
            <View>
              {skills.map((skill, index) => (
                <Text key={index} style={{ marginBottom: 4 }}>- {skill}</Text>
              ))}
              {skills.length === 0 && (
                <Text style={{ lineHeight: 1.6 }}>Strategic Leadership\nProject Management\nScalable Systems</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.name}>{personalInfo.fullName || "Your Full Name"}</Text>
          <Text style={styles.title}>{personalInfo.jobTitle || "Professional Title"}</Text>

          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.summary}>
            {data.summary || "Highly motivated professional with extensive experience in architecting scalable solutions."}
          </Text>

          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {experience.map((exp: any, i: number) => (
            <View key={i} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.title || "Job Title"}</Text>
              <Text style={styles.companyInfo}>{exp.company || "Company Name"} | {exp.duration || "2020 - Present"}</Text>
              {exp.description && (
                 <View style={styles.bulletRow}>
                   <View style={styles.bullet} />
                   <Text style={{ flex: 1 }}>{exp.description}</Text>
                 </View>
              )}
            </View>
          ))}

          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu: any, i: number) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>{edu.degree || "Bachelor of Science"}</Text>
              <Text style={{ color: "#4B5563" }}>{edu.school || "University Name"} | {edu.year || "2015"}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate;

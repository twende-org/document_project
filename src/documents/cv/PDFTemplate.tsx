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
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: "#E5E7EB",
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

const PDFTemplate = ({ data, settings }: { data: CVContent, settings?: any }) => {
  const { personalInfo = {} as any, experience = [], education = [], skills = [] } = data;
  
  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const isCompact = settings?.layout === 'compact';
  const isModern = settings?.layout === 'modern';
  const isElegant = settings?.layout === 'elegant';

  return (
    <Document>
      <Page size="A4" style={[styles.page, isCompact ? { padding: 30 } : {}]}>
        {!isModern && !isElegant && (
          <View style={[styles.sidebar, isCompact ? { width: 140, padding: 20 } : {}]}>
            <View style={{ marginBottom: 40 }}>
              <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40' }]}>Contact</Text>
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={isCompact ? { fontSize: 8 } : {}}>{personalInfo.phone || "+255 000 000 000"}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={isCompact ? { fontSize: 8 } : {}}>{personalInfo.email || "hello@twende.com"}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={isCompact ? { fontSize: 8 } : {}}>{personalInfo.address || "Dar es Salaam, TZ"}</Text>
              </View>
            </View>

            <View>
              <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40' }]}>Expertise</Text>
              <View>
                {skills.map((skill: string, index: number) => (
                  <Text key={index} style={[{ marginBottom: 4 }, isCompact ? { fontSize: 8 } : {}]}>• {skill}</Text>
                ))}
                {skills.length === 0 && (
                  <Text style={[{ lineHeight: 1.6 }, isCompact ? { fontSize: 8 } : {}]}>Strategic Leadership{"\n"}Project Management{"\n"}Scalable Systems</Text>
                )}
              </View>
            </View>
          </View>
        )}

        <View style={[
          styles.main, 
          isModern || isElegant ? { marginLeft: 0, paddingLeft: 0 } : (isCompact ? { marginLeft: 120, paddingLeft: 30 } : {}),
          isElegant ? { alignItems: 'center' } : {}
        ]}>
          <Text style={[
            styles.name, 
            { color: primaryColor }, 
            isCompact ? { fontSize: 20 } : {},
            isElegant ? { textAlign: 'center', fontSize: 32, letterSpacing: 4 } : {}
          ]}>
            {personalInfo.fullName || "Your Full Name"}
          </Text>
          <Text style={[
            styles.title, 
            isCompact ? { fontSize: 10, marginBottom: 15 } : {},
            isElegant ? { textAlign: 'center', marginBottom: 40, opacity: 0.6 } : {}
          ]}>
            {personalInfo.jobTitle || "Professional Title"}
          </Text>

          {(isModern || isElegant) && (
            <View style={[
              { flexDirection: 'row', gap: 20, marginBottom: 20, paddingBottom: 10, borderBottom: 1, borderBottomColor: '#eee' },
              isElegant ? { justifyContent: 'center', borderBottomWidth: 0, marginBottom: 40 } : {}
            ]}>
               <Text style={{ fontSize: 8, color: '#666' }}>{personalInfo.phone}</Text>
               <Text style={{ fontSize: 8, color: '#666' }}>{personalInfo.email}</Text>
               <Text style={{ fontSize: 8, color: '#666' }}>{personalInfo.address}</Text>
            </View>
          )}

          {isModern ? (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              {/* Left Column (8/12 equivalent) */}
              <View style={{ flex: 2 }}>
                <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40', marginTop: 0 }]}>Professional Summary</Text>
                <Text style={styles.summary}>
                  {data.summary || "Highly motivated professional with extensive experience in architecting scalable solutions."}
                </Text>

                <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40' }]}>Professional History</Text>
                {experience.map((exp: any, i: number) => (
                  <View key={i} style={styles.experienceItem}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <Text style={[styles.jobTitle, { fontSize: 13, textTransform: 'uppercase', color: '#1F2937' }]}>{exp.title || "Job Title"}</Text>
                      <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#9CA3AF' }}>{exp.duration || "2020 - Present"}</Text>
                    </View>
                    <Text style={[styles.companyInfo, { color: primaryColor, fontWeight: 'bold', textTransform: 'uppercase', fontSize: 9, marginBottom: 6 }]}>{exp.company || "Company Name"}</Text>
                    {exp.description && (
                      <Text style={{ fontSize: 9, color: '#4B5563', lineHeight: 1.5 }}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
              
              {/* Right Column (4/12 equivalent) */}
              <View style={{ flex: 1 }}>
                <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40', marginTop: 0 }]}>Expertise</Text>
                <View style={{ flexDirection: 'column', gap: 5 }}>
                  {skills.map((skill: string, index: number) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                      <View style={{ width: 3, height: 3, backgroundColor: primaryColor, borderRadius: 2 }} />
                      <Text style={{ fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', color: '#374151' }}>{skill}</Text>
                    </View>
                  ))}
                  {skills.length === 0 && (
                    <Text style={{ fontSize: 8, color: '#666' }}>Strategic Leadership{"\n"}Project Management</Text>
                  )}
                </View>

                <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40' }]}>Academic Background</Text>
                {education.map((edu: any, i: number) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 9, fontWeight: "bold", textTransform: 'uppercase', color: '#1F2937' }}>{edu.degree || "Bachelor of Science"}</Text>
                    <Text style={{ fontSize: 8, color: "#9CA3AF", fontWeight: 'bold' }}>{edu.school || "University Name"} | {edu.year || "2015"}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <>
              <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40' }, isCompact ? { marginTop: 15, marginBottom: 10 } : {}]}>Executive Summary</Text>
              <Text style={[styles.summary, isCompact ? { fontSize: 9 } : {}]}>
                {data.summary || "Highly motivated professional with extensive experience in architecting scalable solutions."}
              </Text>

              <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40' }, isCompact ? { marginTop: 15, marginBottom: 10 } : {}]}>Professional Experience</Text>
              {experience.map((exp: any, i: number) => (
                <View key={i} style={[styles.experienceItem, isCompact ? { marginBottom: 12 } : {}]}>
                  <Text style={[styles.jobTitle, isCompact ? { fontSize: 10 } : {}]}>{exp.title || "Job Title"}</Text>
                  <Text style={[styles.companyInfo, isCompact ? { fontSize: 8 } : {}]}>{exp.company || "Company Name"} | {exp.duration || "2020 - Present"}</Text>
                  {exp.description && (
                     <View style={styles.bulletRow}>
                       <View style={[styles.bullet, { backgroundColor: primaryColor }]} />
                       <Text style={[{ flex: 1 }, isCompact ? { fontSize: 8 } : {}]}>{exp.description}</Text>
                     </View>
                  )}
                </View>
              ))}

              <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '40' }, isCompact ? { marginTop: 15, marginBottom: 10 } : {}]}>Education</Text>
              {education.map((edu: any, i: number) => (
                <View key={i} style={[{ marginBottom: 10 }, isCompact ? { marginBottom: 6 } : {}]}>
                  <Text style={[{ fontWeight: "bold" }, isCompact ? { fontSize: 9 } : {}]}>{edu.degree || "Bachelor of Science"}</Text>
                  <Text style={[{ color: "#4B5563" }, isCompact ? { fontSize: 8 } : {}]}>{edu.school || "University Name"} | {edu.year || "2015"}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate;

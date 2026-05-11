import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { t } from "../../utils/pdfI18n";
import type { CVContent } from "../types";

// Register Fonts
Font.register({
  family: "Times-Roman",
  fonts: [
    { src: "/fonts/Times_New_Roman.ttf" },
    { src: "/fonts/Times_New_Roman_Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Times_New_Roman_Italic.ttf", fontStyle: "italic" },
    { src: "/fonts/Times_New_Roman_Bold_Italic.ttf", fontWeight: "bold", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    color: "#1F2937",
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  // --- Modern Sidebar Layout ---
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 170,
    backgroundColor: "#F3F4F6",
    padding: 25,
    paddingTop: 40,
  },
  mainModern: {
    marginLeft: 150,
    paddingLeft: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#B91C1C",
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#B91C1C",
    paddingBottom: 3,
  },
  sidebarText: {
    fontSize: 8,
    color: "#4B5563",
    marginBottom: 4,
  },
  // --- General Sections ---
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 3,
    marginBottom: 10,
    marginTop: 15,
  },
  experienceItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  expTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  expCompany: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 3,
  },
  expDate: {
    fontSize: 8,
    color: "#9CA3AF",
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 9,
    color: "#4B5563",
    lineHeight: 1.4,
  }
});

const CVPDFTemplate = ({ data, settings }: { data: CVContent, settings?: any }) => {
  const { 
    personalInfo = {} as any, 
    summary = '', 
    experience = [], 
    education = [], 
    skills = { technical: [], soft: [] } as any,
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
    references = []
  } = data;

  const lang = settings?.lang || 'en';
  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const layout = settings?.layout || 'modern';

  // Handle skills regardless of format
  const technicalSkills = Array.isArray(skills) ? skills : (skills?.technical || []);
  const softSkills = Array.isArray(skills) ? [] : (skills?.soft || []);

  // --- ATS / International ---
  if (layout === 'ats' || layout === 'international') {
    return (
      <Document>
        <Page size="A4" style={[styles.page, { padding: 50, fontFamily: 'Times-Roman' }]}>
          <View style={{ marginBottom: 25, textAlign: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 6, lineHeight: 1.2 }}>{personalInfo.fullName}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{personalInfo.jobTitle}</Text>
            <Text style={{ fontSize: 9, marginTop: 4 }}>
              {personalInfo.address} | {personalInfo.phone} | {personalInfo.email}
            </Text>
            {layout === 'international' && personalInfo.nationality && (
              <Text style={{ fontSize: 8, color: '#666', marginTop: 5, textTransform: 'uppercase' }}>{personalInfo.nationality} National</Text>
            )}
          </View>

          <Text style={{ fontSize: 10, fontWeight: 'bold', borderBottomWidth: 1, marginTop: 10, marginBottom: 5 }}>SUMMARY</Text>
          <Text style={{ fontSize: 9, textAlign: 'justify' }}>{summary}</Text>

          <Text style={{ fontSize: 10, fontWeight: 'bold', borderBottomWidth: 1, marginTop: 15, marginBottom: 8 }}>EXPERIENCE</Text>
          {experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{exp.company}</Text>
                <Text style={{ fontSize: 9 }}>{exp.duration}</Text>
              </View>
              <Text style={{ fontSize: 9, fontStyle: 'italic' }}>{exp.title}</Text>
              <Text style={{ fontSize: 9, marginTop: 2, textAlign: 'justify' }}>{exp.description}</Text>
            </View>
          ))}

          <Text style={{ fontSize: 10, fontWeight: 'bold', borderBottomWidth: 1, marginTop: 15, marginBottom: 8 }}>SKILLS</Text>
          <Text style={{ fontSize: 9 }}>{technicalSkills.concat(softSkills).join(' • ')}</Text>

          <Text style={{ fontSize: 10, fontWeight: 'bold', borderBottomWidth: 1, marginTop: 15, marginBottom: 8 }}>EDUCATION</Text>
          {education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{edu.school}</Text>
                <Text style={{ fontSize: 9 }}>{edu.year}</Text>
              </View>
              <Text style={{ fontSize: 9 }}>{edu.degree}</Text>
            </View>
          ))}
        </Page>
      </Document>
    );
  }

  // --- Executive / Academic ---
  if (layout === 'executive' || layout === 'academic') {
    return (
      <Document>
        <Page size="A4" style={[styles.page, { fontFamily: 'Times-Roman', padding: 50, backgroundColor: '#FDFCF8' }]}>
          <View style={{ borderBottomWidth: 2, borderBottomColor: primaryColor, paddingBottom: 15, marginBottom: 25, textAlign: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8, lineHeight: 1.2 }}>{personalInfo.fullName}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{personalInfo.jobTitle}</Text>
            <Text style={{ fontSize: 8, color: '#666', marginTop: 5, letterSpacing: 1 }}>
              {personalInfo.phone} • {personalInfo.email} • {personalInfo.address}
            </Text>
          </View>

          <View style={{ marginBottom: 25 }}>
             <Text style={{ fontSize: 10, fontWeight: 'bold', color: primaryColor, letterSpacing: 1, marginBottom: 5 }}>EXECUTIVE PROFILE</Text>
             <Text style={{ fontSize: 9, textAlign: 'justify', fontStyle: 'italic' }}>{summary}</Text>
          </View>

          <Text style={{ fontSize: 10, fontWeight: 'bold', color: primaryColor, letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: primaryColor + '20', paddingBottom: 3, marginBottom: 15 }}>PROFESSIONAL EXPERIENCE</Text>
          {experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{exp.title}</Text>
                <Text style={{ fontSize: 9 }}>{exp.duration}</Text>
              </View>
              <Text style={{ fontSize: 9, fontStyle: 'italic', color: '#666', marginBottom: 5 }}>{exp.company}</Text>
              <Text style={{ fontSize: 9, textAlign: 'justify' }}>{exp.description}</Text>
            </View>
          ))}

          <Text style={{ fontSize: 10, fontWeight: 'bold', color: primaryColor, letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: primaryColor + '20', paddingBottom: 3, marginTop: 10, marginBottom: 15 }}>EDUCATION</Text>
          {education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{edu.degree}</Text>
              <Text style={{ fontSize: 8, color: '#666' }}>{edu.school} | {edu.year}</Text>
            </View>
          ))}
        </Page>
      </Document>
    );
  }

  // --- Minimalist ---
  if (layout === 'minimal') {
    return (
      <Document>
        <Page size="A4" style={[styles.page, { padding: 60 }]}>
          <View style={{ marginBottom: 40 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 3 }}>{personalInfo.fullName}</Text>
            <Text style={{ fontSize: 8, color: '#666', letterSpacing: 1, marginTop: 4 }}>{personalInfo.jobTitle}</Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#eee', marginTop: 10, paddingTop: 5, flexDirection: 'row', gap: 20 }}>
               <Text style={{ fontSize: 7, color: '#aaa' }}>{personalInfo.email}</Text>
               <Text style={{ fontSize: 7, color: '#aaa' }}>{personalInfo.phone}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 30 }}>
             <View style={{ width: 120 }}>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#ccc', marginBottom: 10 }}>SKILLS</Text>
                {technicalSkills.map((s: string, i: number) => (
                   <Text key={i} style={{ fontSize: 8, marginBottom: 3 }}>{s}</Text>
                ))}
             </View>
             <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 9, fontStyle: 'italic', marginBottom: 20 }}>{summary}</Text>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#ccc', marginBottom: 15 }}>EXPERIENCE</Text>
                {experience.map((exp: any, i: number) => (
                   <View key={i} style={{ marginBottom: 15 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                         <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{exp.title}</Text>
                         <Text style={{ fontSize: 8, color: '#ccc' }}>{exp.duration}</Text>
                      </View>
                      <Text style={{ fontSize: 8, color: '#666', marginBottom: 5 }}>{exp.company}</Text>
                      <Text style={{ fontSize: 8, textAlign: 'justify' }}>{exp.description}</Text>
                   </View>
                ))}
             </View>
          </View>
        </Page>
      </Document>
    );
  }

  // --- Creative ---
  if (layout === 'creative') {
    return (
      <Document>
        <Page size="A4" style={[styles.page, { padding: 0 }]}>
           <View style={{ minHeight: 100, backgroundColor: primaryColor, padding: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                 <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 12, lineHeight: 1.2 }}>{personalInfo.fullName}</Text>
                 <Text style={{ fontSize: 10, color: 'white', opacity: 0.8 }}>{personalInfo.jobTitle}</Text>
              </View>
           </View>

           <View style={{ padding: 40, flexDirection: 'row', gap: 30 }}>
              <View style={{ flex: 2 }}>
                 <Text style={{ fontSize: 9, fontWeight: 'bold', color: primaryColor, marginBottom: 10 }}>THE STORY</Text>
                 <Text style={{ fontSize: 8, fontStyle: 'italic', marginBottom: 20 }}>{summary}</Text>

                 <Text style={{ fontSize: 9, fontWeight: 'bold', color: primaryColor, marginBottom: 10 }}>EXPERIENCE</Text>
                 {experience.map((exp: any, i: number) => (
                   <View key={i} style={{ marginBottom: 15, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: primaryColor + '20' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                         <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{exp.title}</Text>
                         <Text style={{ fontSize: 8, color: primaryColor }}>{exp.duration}</Text>
                      </View>
                      <Text style={{ fontSize: 8, color: '#666', marginBottom: 4 }}>{exp.company}</Text>
                      <Text style={{ fontSize: 8, textAlign: 'justify' }}>{exp.description}</Text>
                   </View>
                 ))}
              </View>

              <View style={{ flex: 1 }}>
                 <View style={{ backgroundColor: '#1F2937', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ fontSize: 7, color: 'white', opacity: 0.5, marginBottom: 5 }}>CONTACT</Text>
                    <Text style={{ fontSize: 8, color: 'white', marginBottom: 4 }}>{personalInfo.phone}</Text>
                    <Text style={{ fontSize: 8, color: 'white', marginBottom: 4 }}>{personalInfo.email}</Text>
                    <Text style={{ fontSize: 8, color: 'white' }}>{personalInfo.address}</Text>
                 </View>

                 <Text style={{ fontSize: 9, fontWeight: 'bold', color: primaryColor, marginBottom: 10 }}>EXPERTISE</Text>
                 <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                    {technicalSkills.map((s: string, i: number) => (
                      <View key={i} style={{ backgroundColor: '#F3F4F6', padding: '3 6', borderRadius: 4 }}>
                         <Text style={{ fontSize: 7, color: '#4B5563' }}>{s}</Text>
                      </View>
                    ))}
                 </View>
              </View>
           </View>
        </Page>
      </Document>
    );
  }

  // --- Modern / Technical / Student / Corporate (Sidebar) ---
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.sidebar, layout === 'technical' ? { backgroundColor: '#1F2937' } : {}]}>
          <Text style={[styles.sidebarSectionTitle, { color: primaryColor, borderBottomColor: primaryColor }, layout === 'technical' ? { color: 'white', borderBottomColor: 'white' } : {}]}>Contact</Text>
          <Text style={[styles.sidebarText, layout === 'technical' ? { color: '#ccc' } : {}]}>{personalInfo.phone}</Text>
          <Text style={[styles.sidebarText, layout === 'technical' ? { color: '#ccc' } : {}]}>{personalInfo.email}</Text>
          <Text style={[styles.sidebarText, layout === 'technical' ? { color: '#ccc' } : {}]}>{personalInfo.address}</Text>
          
          <Text style={[styles.sidebarSectionTitle, { color: primaryColor, borderBottomColor: primaryColor }, layout === 'technical' ? { color: 'white', borderBottomColor: 'white' } : {}]}>Skills</Text>
          {technicalSkills.map((s: string, i: number) => (
            <Text key={i} style={[styles.sidebarText, layout === 'technical' ? { color: '#ccc' } : {}]}>• {s}</Text>
          ))}
        </View>

        <View style={styles.mainModern}>
          <Text style={[styles.name, { color: primaryColor }]}>{personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>

          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '20', marginTop: 0 }]}>
            {layout === 'student' ? 'ACADEMIC SUMMARY' : 'PROFILE'}
          </Text>
          <Text style={styles.textSmall}>{summary}</Text>

          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '20' }]}>
            {layout === 'student' ? 'PROJECTS & ROLES' : 'EXPERIENCE'}
          </Text>
          {experience.map((exp, i) => (
            <View key={i} style={styles.experienceItem}>
              <View style={styles.expHeader}>
                <Text style={styles.expTitle}>{exp.title}</Text>
                <Text style={styles.expDate}>{exp.duration}</Text>
              </View>
              <Text style={[styles.expCompany, { color: primaryColor }]}>{exp.company}</Text>
              <Text style={styles.textSmall}>{exp.description}</Text>
            </View>
          ))}

          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: primaryColor + '20' }]}>
            EDUCATION
          </Text>
          {education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                 <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{edu.degree}</Text>
                 <Text style={{ fontSize: 8, color: '#9CA3AF' }}>{edu.year}</Text>
              </View>
              <Text style={{ fontSize: 9, color: '#6B7280' }}>{edu.school}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CVPDFTemplate;

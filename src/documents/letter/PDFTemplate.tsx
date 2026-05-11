import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: 'Helvetica',
    color: '#1a1a1a',
    position: 'relative'
  },
  watermark: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    textAlign: 'center',
    color: '#eeeeee',
    fontSize: 60,
    transform: 'rotate(-45deg)',
    opacity: 0.3,
    zIndex: -1
  },
  senderSectionTopRight: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  senderSectionTopLeft: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  senderName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  senderTitle: {
    fontSize: 10,
    color: '#444',
    marginTop: 2,
  },
  senderAddress: {
    fontSize: 10,
    color: '#444',
  },
  refDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  refText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#444'
  },
  dateText: {
    fontSize: 10,
  },
  recipientSection: {
    marginBottom: 25,
  },
  recipientName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2
  },
  recipientTitle: {
    fontSize: 10,
    color: '#444',
    marginBottom: 1
  },
  recipientOrg: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 1
  },
  recipientAddress: {
    fontSize: 10,
  },
  subject: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  salutation: {
    fontSize: 10,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  body: {
    textAlign: 'justify',
    marginBottom: 20,
    lineHeight: 1.6
  },
  bodyParagraph: {
    marginBottom: 10
  },
  closing: {
    marginTop: 20,
    marginBottom: 40
  },
  closingText: {
    marginBottom: 40
  },
  signatureSection: {
    width: 200,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#000'
  },
  senderContact: {
    fontSize: 9,
    color: '#666'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 8,
    color: '#888',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10
  },
  // Certificate Specific Styles
  certPage: {
    padding: 0,
    backgroundColor: '#fff',
  },
  certBorder: {
    margin: 20,
    borderWidth: 10,
    borderColor: '#B91C1C', // Default, will be overridden inline
    height: '93%',
    padding: 40,
    alignItems: 'center',
    position: 'relative'
  },
  certHeader: {
    fontSize: 40,
    fontFamily: 'Times-Roman',
    marginBottom: 20,
    color: '#B91C1C', // Default, will be overridden inline
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  certSubHeader: {
    fontSize: 18,
    fontFamily: 'Times-Roman',
    marginBottom: 40,
    textAlign: 'center'
  },
  certInternName: {
    fontSize: 32,
    fontFamily: 'Times-Bold',
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline'
  },
  certBody: {
    fontSize: 14,
    fontFamily: 'Times-Roman',
    lineHeight: 1.8,
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 40
  },
  certFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 40
  },
  certSigLine: {
    width: 150,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    alignItems: 'center'
  },
  certSigText: {
    fontSize: 10,
    fontFamily: 'Times-Bold'
  },
  certSeal: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#B91C1C',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5
  }
});

export interface LetterData {
  referenceNumber?: string;
  reference_number?: string;
  senderName?: string;
  sender_name?: string;
  senderTitle?: string;
  sender_title?: string;
  senderOrganization?: string;
  sender_organization?: string;
  senderAddress?: string;
  sender_address?: string;
  senderContact?: string;
  sender_contact?: string;
  recipientName?: string;
  recipient_name?: string;
  recipientTitle?: string;
  recipient_title?: string;
  recipientOrganization?: string;
  recipient_organization?: string;
  recipientAddress?: string;
  recipient_address?: string;
  date?: string;
  subject?: string;
  salutation?: string;
  body?: string;
  closing?: string;
  watermarkText?: string;
  watermark_text?: string;
  logoUrl?: string;
  logo_url?: string;
  // Internship
  internName?: string;
  intern_name?: string;
  internshipId?: string;
  internship_id?: string;
  university?: string;
  department?: string;
  internshipTitle?: string;
  internship_title?: string;
  organization?: string;
  duration?: string;
  startDate?: string;
  start_date?: string;
  endDate?: string;
  end_date?: string;
  supervisorName?: string;
  supervisor_name?: string;
  supervisorTitle?: string;
  supervisor_title?: string;
  workDepartment?: string;
  work_department?: string;
  objectives?: string;
  skillsAcquired?: string;
  skills_acquired?: string;
  performanceRemarks?: string;
  performance_remarks?: string;
  qrCodeUrl?: string;
  qr_code_url?: string;
  sealUrl?: string;
  seal_url?: string;
  signatureUrl?: string;
  signature_url?: string;
}

const LetterPDFTemplate = ({ data, settings }: { data: LetterData, settings?: { theme?: { primaryColor?: string }, layout?: string, lang?: string, [key: string]: unknown } }) => {
  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const layout = settings?.layout || 'standard'; // standard, modern, compact, elegant
  const lang = settings?.lang || 'en';

  const getSubject = (subject: string) => {
    if (!subject) return "";
    const s = subject.toUpperCase();
    if (s.startsWith('RE:') || s.startsWith('YAH:') || s.startsWith('KUH:')) return subject;
    return `${lang.startsWith('sw') ? 'YAH:' : 'RE:'} ${subject}`;
  };

  // Normalize data keys (UI provides camelCase, backend provides snake_case)
  const d = {
    referenceNumber: data.referenceNumber || data.reference_number,
    senderName: data.senderName || data.sender_name,
    senderTitle: data.senderTitle || data.sender_title,
    senderOrganization: data.senderOrganization || data.sender_organization,
    senderAddress: data.senderAddress || data.sender_address,
    senderContact: data.senderContact || data.sender_contact,
    recipientName: data.recipientName || data.recipient_name,
    recipientTitle: data.recipientTitle || data.recipient_title,
    recipientOrganization: data.recipientOrganization || data.recipient_organization,
    recipientAddress: data.recipientAddress || data.recipient_address,
    date: data.date,
    subject: data.subject,
    salutation: data.salutation,
    body: data.body,
    closing: data.closing,
    watermarkText: data.watermarkText || data.watermark_text,
    logoUrl: data.logoUrl || data.logo_url,
    // Internship
    internName: data.internName || data.intern_name,
    internshipId: data.internshipId || data.internship_id,
    university: data.university,
    department: data.department,
    internshipTitle: data.internshipTitle || data.internship_title,
    organization: data.organization,
    duration: data.duration,
    startDate: data.startDate || data.start_date,
    endDate: data.endDate || data.end_date,
    supervisorName: data.supervisorName || data.supervisor_name,
    supervisorTitle: data.supervisorTitle || data.supervisor_title,
    workDepartment: data.workDepartment || data.work_department,
    objectives: data.objectives,
    skillsAcquired: data.skillsAcquired || data.skills_acquired,
    performanceRemarks: data.performanceRemarks || data.performance_remarks,
    qrCodeUrl: data.qrCodeUrl || data.qr_code_url,
    sealUrl: data.sealUrl || data.seal_url,
    signatureUrl: data.signatureUrl || data.signature_url,
  };

  const renderBodyParagraphs = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((paragraph, idx) => (
      <Text key={idx} style={styles.bodyParagraph}>
        {paragraph}
      </Text>
    ));
  };

  const Watermark = () => {
    if (!d.watermarkText) return null;
    return <Text style={styles.watermark}>{d.watermarkText}</Text>;
  };

  const Footer = () => {
    if (!d.senderContact && layout !== 'elegant') return null;
    return (
      <View style={styles.footer} fixed>
        <Text>{d.senderContact || d.senderAddress}</Text>
      </View>
    );
  };

  if (layout === 'certificate') {
    return (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.certPage}>
          <View style={[styles.certBorder, { borderColor: primaryColor }]}>
            <Watermark />
            
            <View style={{ marginBottom: 40, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', fontFamily: 'Times-Roman' }}>{d.senderOrganization || d.senderName}</Text>
            </View>

            <Text style={[styles.certHeader, { color: primaryColor }]}>{d.subject || 'Certificate of Internship'}</Text>
            <View style={{ marginBottom: 30, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontFamily: 'Times-Italic', marginBottom: 10 }}>This is to certify that</Text>
              <Text style={{ fontSize: 32, fontFamily: 'Times-Bold', color: '#000', borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 300, textAlign: 'center' }}>{d.internName || d.recipientName}</Text>
            </View>

            <View style={{ marginBottom: 40, alignItems: 'center', width: '80%' }}>
              <Text style={{ fontSize: 14, textAlign: 'center', lineHeight: 1.6, fontFamily: 'Times-Roman' }}>
                Has successfully completed their internship as a <Text style={{ fontFamily: 'Times-Bold' }}>{d.internshipTitle || 'Intern'}</Text> at <Text style={{ fontFamily: 'Times-Bold' }}>{d.senderOrganization || 'our institution'}</Text>. 
                During the period from <Text style={{ fontFamily: 'Times-Bold' }}>{d.startDate || '[Start Date]'}</Text> to <Text style={{ fontFamily: 'Times-Bold' }}>{d.endDate || '[End Date]'}</Text>.
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30, paddingHorizontal: 40 }}>
              <View style={[styles.certSigLine, { width: 200 }]}>
                <Text style={styles.certSigText}>{d.supervisorName || 'Supervisor'}</Text>
                <Text style={{ fontSize: 8, color: '#666' }}>{d.supervisorTitle || 'Department Head'}</Text>
              </View>
              
              <View style={[styles.certSigLine, { width: 200 }]}>
                <Text style={styles.certSigText}>{d.senderName}</Text>
                <Text style={{ fontSize: 8, color: '#666' }}>{d.senderTitle || 'Managing Director'}</Text>
              </View>
            </View>

            <View style={[styles.certSeal, { borderColor: primaryColor }]}>
              <View style={{ width: '90%', height: '90%', borderRadius: 36, borderStyle: 'dashed', borderWidth: 1, borderColor: primaryColor, alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                <Text style={{ fontSize: 8, color: primaryColor, textAlign: 'center', fontFamily: 'Times-Bold' }}>OFFICIAL SEAL</Text>
              </View>
            </View>

            <Text style={{ position: 'absolute', bottom: 20, left: 20, fontSize: 8, color: '#999' }}>
              Verification ID: {d.internshipId || d.referenceNumber || 'N/A'}
            </Text>
          </View>
        </Page>
      </Document>
    );
  }

  if (layout === 'elegant') {
    return (
      <Document>
        <Page size="A4" style={[styles.page, { padding: 60, fontFamily: 'Times-Roman' }]}>
          <Watermark />
          
          <View style={styles.senderSectionTopRight}>
            <Text style={[styles.senderName, { fontSize: 14, fontFamily: 'Times-Roman' }]}>{d.senderName}</Text>
            {d.senderOrganization && <Text style={[styles.senderAddress, { fontFamily: 'Times-Roman', color: '#000' }]}>{d.senderOrganization}</Text>}
            <Text style={[styles.senderAddress, { fontFamily: 'Times-Roman', color: '#000' }]}>{d.senderAddress}</Text>
            <Text style={[styles.senderContact, { fontFamily: 'Times-Roman', color: '#000' }]}>{d.senderContact}</Text>
          </View>

          <View style={[styles.refDateRow]}>
            <Text style={[styles.refText, { fontFamily: 'Times-Roman' }]}>{d.referenceNumber ? `Ref: ${d.referenceNumber}` : ''}</Text>
            <Text style={[styles.dateText, { fontFamily: 'Times-Roman' }]}>{d.date}</Text>
          </View>

          <View style={styles.recipientSection}>
            <Text style={[styles.recipientName, { fontFamily: 'Times-Roman' }]}>{d.recipientName}</Text>
            {d.recipientTitle && <Text style={[styles.recipientTitle, { fontFamily: 'Times-Roman' }]}>{d.recipientTitle}</Text>}
            {d.recipientOrganization && <Text style={[styles.recipientOrg, { fontFamily: 'Times-Roman' }]}>{d.recipientOrganization}</Text>}
            <Text style={[styles.recipientAddress, { fontFamily: 'Times-Roman' }]}>{d.recipientAddress}</Text>
          </View>

          {d.salutation && <Text style={[styles.salutation, { fontFamily: 'Times-Roman' }]}>{d.salutation}</Text>}

          {d.subject && (
            <Text style={[styles.subject, { fontFamily: 'Times-Roman', textDecoration: 'underline' }]}>
              {getSubject(d.subject)}
            </Text>
          )}

          <View style={[styles.body, { fontFamily: 'Times-Roman', fontSize: 11, lineHeight: 1.8 }]}>
            {renderBodyParagraphs(d.body || '')}
          </View>

          <View style={styles.closing}>
            <Text style={[styles.closingText, { fontFamily: 'Times-Roman' }]}>{d.closing || 'Sincerely,'}</Text>
            <View style={styles.signatureSection}>
              <Text style={[styles.senderName, { fontFamily: 'Times-Roman' }]}>{d.supervisorName || d.senderName}</Text>
              { (d.supervisorTitle || d.senderTitle) && (
                <Text style={[styles.senderTitle, { fontFamily: 'Times-Roman' }]}>{d.supervisorTitle || d.senderTitle}</Text>
              )}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  if (layout === 'modern') {
    return (
      <Document>
        <Page size="A4" style={[styles.page]}>
          <Watermark />
          
          <View style={{ marginBottom: 40, borderLeftWidth: 4, borderLeftColor: primaryColor, paddingLeft: 10 }}>
            <Text style={[styles.senderName, { fontSize: 18, color: primaryColor }]}>{d.senderName}</Text>
            {d.senderOrganization && <Text style={{ fontSize: 10, color: '#444', marginTop: 2 }}>{d.senderOrganization}</Text>}
            <Text style={{ fontSize: 9, color: '#666', marginTop: 2 }}>{d.senderAddress}</Text>
            <Text style={{ fontSize: 9, color: '#666' }}>{d.senderContact}</Text>
          </View>

          <View style={[styles.refDateRow]}>
            <Text style={styles.refText}>{d.referenceNumber ? `Ref: ${d.referenceNumber}` : ''}</Text>
            <Text style={styles.dateText}>{d.date}</Text>
          </View>

          <View style={styles.recipientSection}>
            <Text style={styles.recipientName}>{d.recipientName}</Text>
            {d.recipientTitle && <Text style={styles.recipientTitle}>{d.recipientTitle}</Text>}
            {d.recipientOrganization && <Text style={styles.recipientOrg}>{d.recipientOrganization}</Text>}
            <Text style={styles.recipientAddress}>{d.recipientAddress}</Text>
          </View>

          {d.salutation && <Text style={styles.salutation}>{d.salutation}</Text>}

          {d.subject && (
            <Text style={[styles.subject, { color: primaryColor }]}>
              {getSubject(d.subject)}
            </Text>
          )}

          <View style={[styles.body, { fontSize: 10 }]}>
            {renderBodyParagraphs(d.body || '')}
          </View>

          <View style={styles.closing}>
            <Text style={styles.closingText}>{d.closing || 'Sincerely,'}</Text>
            <View style={styles.signatureSection}>
              <Text style={styles.senderName}>{d.supervisorName || d.senderName}</Text>
              {(d.supervisorTitle || d.senderTitle) && (
                <Text style={styles.senderTitle}>{d.supervisorTitle || d.senderTitle}</Text>
              )}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // Standard and Compact
  const isCompact = layout === 'compact';
  return (
    <Document>
      <Page size="A4" style={[styles.page, isCompact ? { padding: 40, fontSize: 9 } : {}]}>
        <Watermark />
        
        {/* Standard block format puts sender at top right */}
        <View style={styles.senderSectionTopRight}>
          <Text style={styles.senderName}>{d.senderName}</Text>
          {d.senderOrganization && <Text style={styles.senderAddress}>{d.senderOrganization}</Text>}
          <Text style={styles.senderAddress}>{d.senderAddress}</Text>
          <Text style={styles.senderContact}>{d.senderContact}</Text>
        </View>

        <View style={[styles.refDateRow]}>
          <Text style={styles.refText}>{d.referenceNumber ? `Ref: ${d.referenceNumber}` : ''}</Text>
          <Text style={styles.dateText}>{d.date}</Text>
        </View>

        <View style={styles.recipientSection}>
          <Text style={styles.recipientName}>{d.recipientName}</Text>
          {d.recipientTitle && <Text style={styles.recipientTitle}>{d.recipientTitle}</Text>}
          {d.recipientOrganization && <Text style={styles.recipientOrg}>{d.recipientOrganization}</Text>}
          <Text style={styles.recipientAddress}>{d.recipientAddress}</Text>
        </View>

        {d.salutation && <Text style={styles.salutation}>{d.salutation}</Text>}

        {d.subject && (
          <Text style={[styles.subject, { textDecoration: 'underline' }]}>
            {getSubject(d.subject)}
          </Text>
        )}

        <View style={[styles.body, isCompact ? { lineHeight: 1.4 } : {}]}>
          {renderBodyParagraphs(d.body || '')}
        </View>

        <View style={styles.closing}>
          <Text style={styles.closingText}>{d.closing || 'Sincerely,'}</Text>
          <View style={styles.signatureSection}>
            <Text style={styles.senderName}>{d.supervisorName || d.senderName}</Text>
            {(d.supervisorTitle || d.senderTitle) && (
              <Text style={styles.senderTitle}>{d.supervisorTitle || d.senderTitle}</Text>
            )}
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

export default LetterPDFTemplate;

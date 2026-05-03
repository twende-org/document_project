import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { t } from "../../utils/pdfI18n";

// Register custom font for premium feel (if available, fallback to Helvetica)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/700.woff2', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    color: "#1F2937", // Charcoal
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: "#B91C1C", // Deep Red
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B91C1C",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  billTo: {
    width: "50%",
    paddingRight: 20,
  },
  label: {
    color: "#9CA3AF",
    textTransform: "uppercase",
    fontSize: 8,
    marginBottom: 4,
    letterSpacing: 1,
  },
  value: {
    fontWeight: "bold",
    fontSize: 12,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 10,
    fontWeight: "bold",
    color: "#4B5563",
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: "#E5E7EB",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: "#F3F4F6",
  },
  descCol: { width: "60%", paddingRight: 10 },
  qtyCol: { width: "10%", textAlign: "center" },
  priceCol: { width: "15%", textAlign: "right" },
  totalCol: { width: "15%", textAlign: "right" },
  totalsContainer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopStyle: 'solid',
    borderTopColor: "#F3F4F6",
    alignItems: "flex-end",
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 8,
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: "#1F2937",
    fontWeight: "bold",
    fontSize: 14,
    color: "#B91C1C",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 2,
  }
});

interface InvoicePDFProps {
  data: any;
  settings?: any;
}

const PDFTemplate = ({ data, settings }: InvoicePDFProps) => {
  const { clientName, clientAddress, invoiceDate, dueDate, items, taxRate = 18 } = data;
  const lang = settings?.lang || 'en';
  
  const subtotal = items.reduce((acc: number, item: any) => acc + (item.quantity * item.unitPrice), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const isCompact = settings?.layout === 'compact';
  const isModern = settings?.layout === 'modern';
  const isElegant = settings?.layout === 'elegant';

  return (
    <Document>
      <Page size="A4" style={[styles.page, isCompact ? { padding: 30 } : {}]}>
        {/* Header */}
        <View style={[
          styles.header, 
          { borderBottomColor: primaryColor }, 
          isCompact ? { marginBottom: 20 } : {},
          isModern ? { backgroundColor: primaryColor, borderBottomWidth: 0, marginTop: -40, marginHorizontal: -40, marginBottom: 40, paddingTop: 60, paddingBottom: 50, paddingHorizontal: 40, flexDirection: 'row', alignItems: 'center' } : {},
          isElegant ? { borderBottomWidth: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 60 } : {}
        ]}>
          <View style={isElegant ? { alignItems: 'center' } : {}}>
            <Text style={[
              styles.logo, 
              { color: primaryColor }, 
              isModern ? { color: 'white' } : {},
              isElegant ? { fontSize: 32, letterSpacing: 8 } : {}
            ]}>TWENDE</Text>
            <Text style={[
              { fontSize: 8, color: "#9CA3AF", letterSpacing: 3 }, 
              isModern ? { color: 'white', opacity: 0.8 } : {},
              isElegant ? { marginTop: 5 } : {}
            ]}>DOCUMENTS ARCHITECT</Text>
          </View>
          {!isElegant && (
            <View style={{ textAlign: "right" }}>
              <Text style={[{ fontWeight: "bold", fontSize: 16 }, isModern ? { color: 'white' } : {}]}>{t('invoice.invoice', lang)}</Text>
              <Text style={[{ color: "#9CA3AF" }, isModern ? { color: 'white', opacity: 0.8 } : {}]}>#INV-{new Date().getTime().toString().slice(-6)}</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={[
          styles.detailsContainer, 
          isCompact ? { marginBottom: 15 } : {},
          isModern || isElegant ? { marginTop: 20 } : {}
        ]}>
          <View style={styles.billTo}>
            <Text style={styles.label}>{t('invoice.invoice_to', lang)}</Text>
            <Text style={[styles.value, isCompact ? { fontSize: 10 } : {}]}>{clientName || "Client Name"}</Text>
            <Text style={{ color: "#4B5563", marginTop: 4, width: '100%', fontSize: isCompact ? 8 : 10 }}>{clientAddress || "Client Address"}</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <View style={{ marginBottom: isCompact ? 5 : 10 }}>
              <Text style={styles.label}>{t('invoice.issue_date', lang)}:</Text>
              <Text style={[styles.value, isCompact ? { fontSize: 10 } : {}]}>{invoiceDate || "YYYY-MM-DD"}</Text>
            </View>
            <View>
              <Text style={styles.label}>{t('invoice.due_date', lang)}:</Text>
              <Text style={[styles.value, { color: primaryColor }, isCompact ? { fontSize: 10 } : {}]}>{dueDate || "YYYY-MM-DD"}</Text>
            </View>
          </View>
        </View>

        {/* Table */}
        <View style={[styles.table, isModern ? { marginTop: 30 } : {}]}>
          <View style={[
            styles.tableHeader, 
            isCompact ? { padding: 6 } : {},
            isModern ? { backgroundColor: 'white', borderBottomColor: primaryColor, borderBottomWidth: 2, paddingHorizontal: 0 } : {}
          ]}>
            <Text style={[styles.descCol, isModern ? { color: primaryColor } : {}]}>{t('invoice.description', lang) || "Description"}</Text>
            <Text style={[styles.qtyCol, isModern ? { color: primaryColor } : {}]}>{t('invoice.qty', lang) || "Qty"}</Text>
            <Text style={[styles.priceCol, isModern ? { color: primaryColor } : {}]}>{t('invoice.unit_price', lang) || "Unit Price"}</Text>
            <Text style={[styles.totalCol, isModern ? { color: primaryColor } : {}]}>{t('invoice.total', lang) || "Total"}</Text>
          </View>
          {items.map((item: any, i: number) => (
            <View key={i} style={[
              styles.tableRow, 
              isCompact ? { padding: 6 } : {},
              isModern ? { paddingHorizontal: 0, borderBottomColor: '#f9f9f9' } : {}
            ]}>
              <Text style={[styles.descCol, isCompact ? { fontSize: 9 } : {}]}>{item.description || "Service Item"}</Text>
              <Text style={[styles.qtyCol, isCompact ? { fontSize: 9 } : {}]}>{item.quantity || 1}</Text>
              <Text style={[styles.priceCol, isCompact ? { fontSize: 9 } : {}]}>{item.unitPrice?.toLocaleString() || 0}</Text>
              <Text style={[styles.totalCol, isCompact ? { fontSize: 9, fontWeight: 'bold' } : { fontWeight: 'bold' }]}>{(item.quantity * item.unitPrice)?.toLocaleString() || 0}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={[styles.totalsContainer, isCompact ? { marginTop: 20 } : {}]}>
          <View style={styles.totalLine}>
            <Text style={{ color: "#9CA3AF" }}>{t('invoice.subtotal', lang)}:</Text>
            <Text style={{ fontWeight: "bold" }}>TSh {subtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.totalLine}>
            <Text style={{ color: "#9CA3AF" }}>{t('invoice.tax', lang)} ({taxRate}%):</Text>
            <Text style={{ fontWeight: "bold" }}>TSh {tax.toLocaleString()}</Text>
          </View>
          <View style={[
            styles.grandTotal, 
            { color: primaryColor, borderTopColor: primaryColor }, 
            isCompact ? { fontSize: 12, width: 150 } : {},
            isModern ? { backgroundColor: '#F9FAFB', padding: 15, borderTopWidth: 0, width: 220, borderRadius: 4 } : {}
          ]}>
            <Text>{t('invoice.amount_payable', lang)}:</Text>
            <Text>TSh {total.toLocaleString()}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>{t('invoice.precision_engine', lang)}</Text>
      </Page>
    </Document>
  );
};

export default PDFTemplate;

// src/components/PDFDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: "table",
    width: "auto",
    margin: "10px 0",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 12,
  },
});

const PDFDocument = ({ users }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>User List</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Email</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Phone</Text>
          </View>
        </View>
        {users.map((user, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{user.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{user.email}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{user.phone}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;

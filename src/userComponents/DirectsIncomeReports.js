import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { url } from "../apiHelper/apiHelper";

const DirectsIncomeReports = () => {
  let userId = localStorage.getItem("userId");
  let userName = localStorage.getItem("userName");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef(null);
  const dt = useRef(null);

  const getWalletData = async () => {
    const response = await fetch(`${url}/api/users/users-wallet`, {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === 200) {
      let allDirect = [];
      data.result.map((item) => {
        if (item.reason === "Refer & Earn Level 1") {
          allDirect.push(item);
        }
      });
      setUsers(allDirect);
    } else {
      setUsers([]);
    }
  };

  // console.log(data);

  useEffect(() => {
    getWalletData();
  }, [userId]);

  const getTotal = () => {
    let total = 0;
    users.map((item) => {
      if (item.type === "Credit") {
        total += parseInt(item.amount);
      }
    });
    return total;
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        // Calculate total amounts (credit and debit)
        let totalAmount = 0;

        const usersWithSerial = users.map((user, index) => {
          const amount = user.amount || 0; // Handle potential undefined or null values
          if (user.type === "Credit") {
            totalAmount += amount; // Add to total credit if type is "Credit"
          } 
          return {
            srNo: index + 1, // Serial Number
            ...user, // Spread the existing user data
          };
        });

        const exportColumns = [
          { header: "SR No.", dataKey: "srNo" }, // Add Serial Number column
          { header: "Transaction ID", dataKey: "transactionId" },
          { header: "Transaction Date", dataKey: "transactionDate" },
          { header: "User Name", dataKey: "userName" },
          { header: "User Mobile", dataKey: "userMobile" },
          { header: "Amount", dataKey: "amount" },
          { header: "Transaction Type", dataKey: "type" },
          { header: "Reason", dataKey: "reason" },
          { header: "Status", dataKey: "status" },
        ];

        const options = {
          margin: { top: 10 },
          styles: {
            fillColor: [255, 255, 255], // Background color for the table
            textColor: [0, 0, 0], // Text color
            lineColor: [0, 0, 0], // Border color
            lineWidth: 0.3, // Border thickness
          },
          headStyles: {
            fillColor: [200, 200, 200], // Background color for the header
            textColor: [0, 0, 0],
            lineWidth: 0.3,
            lineColor: [0, 0, 0],
          },
          didParseCell: (data) => {
            // Add border to each cell
            const { cell } = data;
            cell.styles.border = { color: [0, 0, 0], width: 0.3 }; // Cell border color and width
          },
          didDrawPage: () => {
            // Add footer with total amounts
            const pageHeight = doc.internal.pageSize.height;
            doc.setFontSize(10);
            doc.text(`Total Amount: ${totalAmount}`, 14, pageHeight - 10);
          },
        };

        // Generate the table with borders
        doc.autoTable(exportColumns, usersWithSerial, options);

        // Save the PDF
        doc.save("Direct_Income_Report.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      // Define the fields and their corresponding headings
      const fieldMapping = {
        srNo: "SR No.", // Adding Serial Number mapping
        transactionId: "Transaction ID",
        transactionDate: "Transaction Date",
        userName: "User Name",
        userMobile: "User Mobile",
        amount: "Amount",
        type: "Transaction Type",
        reason: "Reason",
        status: "Status",
      };

      // Extract only the fields you want to export
      const limitedFields = Object.keys(fieldMapping);

      // Map through the users to create a new array with only the limited fields
      const filteredUsers = users.map((user, index) => {
        const filteredUser = {};
        limitedFields.forEach((field) => {
          // For serial number, set the value based on index
          if (field === "srNo") {
            filteredUser[field] = index + 1; // Serial Number (1-based index)
          } else {
            filteredUser[field] = user[field]; // Only include specified fields
          }
        });
        return filteredUser;
      });

      // Create the worksheet with the filtered data
      const worksheet = xlsx.utils.json_to_sheet(filteredUsers);

      // Create an array of headers based on the fieldMapping
      const headers = limitedFields.map((field) => fieldMapping[field]);

      // Add the headers to the worksheet
      xlsx.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

      let totalAmount = 0;
      // Calculate total amount
      filteredUsers.forEach((user) => {
        const amount = user.amount || 0; // Handle potential undefined or null values
        if (user.type === "Credit") {
          totalAmount += amount; // Add to total credit if type is "Credit"
        } else if (user.type === "Debit") {
          totalAmount -= amount; // Add to total debit if type is "Debit"
        }
      });

      // Add total amount footer
      const footerRow = ["", "", "", "Total Amount :", totalAmount, "", "", ""]; // Adjust as necessary
      xlsx.utils.sheet_add_aoa(worksheet, [footerRow], { origin: -1 }); // -1 means to append at the end

      // Create the workbook
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Save the Excel file
      saveAsExcelFile(excelBuffer, "Direct_Income_Report");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between py-1">
      <h4 className="m-0">Direct Income Report</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
      <p className="mb-0 fw-bold">
        Total Directs : <i className="fa fa-rupee"></i> {getTotal()}
      </p>
      <div className="flex align-items-center justify-content-end gap-2">
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          rounded
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          value={users}
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="#"
            header="#"
            body={(rowData, options) => options.rowIndex + 1}
            sortable
          ></Column>
          <Column field="transactionId" header="Txn ID" sortable></Column>
          <Column field="transactionDate" header="Date" sortable></Column>
          <Column field="userId" header="SP. Id" sortable></Column>
          <Column field="userName" header="SP. Name" sortable></Column>
          <Column field="cUserId" header="Id" sortable></Column>
          <Column field="cUserName" header="Name" sortable></Column>
          <Column field="amount" header="Amount" sortable></Column>
          <Column field="type" header="Type" sortable></Column>
          <Column field="reason" header="Reason" sortable></Column>
          <Column field="status" header="Status" sortable></Column>
        </DataTable>
      </div>
    </>
  );
};

export default DirectsIncomeReports;

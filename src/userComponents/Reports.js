import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { url } from "../apiHelper/apiHelper";

const Reports = () => {
  let userId = localStorage.getItem("userId");
  let userName = localStorage.getItem("userName");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef(null);
  const dt = useRef(null);

  const getAllUsers = async () => {
    const response = await fetch(`${url}/api/users/all-refer-users`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 200) {
      setUsers(result.result);
    } else {
      setUsers(result.result);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [userId]);

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        const usersWithSerial = users.map((user, index) => {
          return {
            srNo: index + 1, // Serial Number
            ...user, // Spread the existing user data
          };
        });

        const exportColumns = [
          { header: "SR No.", dataKey: "srNo" }, // Add Serial Number column
          { header: "SponsorId", dataKey: "sponsorId" },
          { header: "Name", dataKey: "name" },
          { header: "Email", dataKey: "email" },
          { header: "Mobile", dataKey: "mobile" },
          { header: "Address", dataKey: "address" },
          { header: "Card No.", dataKey: "cardNumber" },
          { header: "Package Name", dataKey: "packageName" },
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
          },
        };

        // Generate the table with borders
        doc.autoTable(exportColumns, usersWithSerial, options);

        // Save the PDF
        doc.save("Report.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      // Define the fields and their corresponding headings
      const fieldMapping = {
        srNo: "SR No.", // Adding Serial Number mapping
        sponsorId: "sponsorId",
        name: "Name",
        email: "Email",
        mobile: "Mobile",
        address: "Address",
        cardNumber: "Card No.",
        packageName: "Package Name",
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

      // Create the workbook
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Save the Excel file
      saveAsExcelFile(excelBuffer, "Reports");
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
      <h4 className="m-0">Report</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>

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
          <Column
            field="_id"
            header="User Id"
            sortable
          ></Column>
          <Column field="sponsorId" header="SponsorId" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="mobile" header="Mobile No." sortable></Column>
          <Column field="address" header="Address" sortable></Column>
          <Column field="cardNumber" header="Card No." sortable></Column>
          <Column field="packageName" header="Package Name" sortable></Column>
          <Column field="status" header="Status" sortable></Column>
        </DataTable>
      </div>
    </>
  );
};

export default Reports;

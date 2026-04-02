function switchTab(tabId) {
    // Hide all sections
    document.querySelectorAll('.data-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section and activate tab
    document.getElementById(tabId + '-section').classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
}

function downloadCSV() {
    // UTF-8 BOM for Excel to properly render Gujarati characters
    let csvContent = "\uFEFF"; 
    
    // Function to parse a single table
    const parseTable = (tableId, title) => {
        let content = title + "\n";
        const table = document.getElementById(tableId);
        if (!table) return "";
        
        const rows = table.querySelectorAll("tr");
        
        rows.forEach(row => {
            let rowData = [];
            const cols = row.querySelectorAll("th, td");
            cols.forEach(col => {
                // Ensure proper escaping of quotes and commas
                let cellData = col.innerText || col.textContent;
                cellData = cellData.replace(/\n/g, " ").replace(/"/g, '""');
                rowData.push('"' + cellData + '"');
            });
            content += rowData.join(",") + "\n";
        });
        return content + "\n\n";
    };

    // Gather data from both tables
    csvContent += parseTable('bal-table', 'બાળ પ્રવૃત્તિ (Bal Pravrutti)');
    csvContent += parseTable('balika-table', 'બાલિકા પ્રવૃત્તિ (Balika Pravrutti)');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "bharuch_bal_balika_directory.csv");
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export const downloadCsv = (csv: string, title: string) => {
  const blob = new Blob([csv], { type: 'text/csv' });
  const csvUrl = window.webkitURL.createObjectURL(blob);
  const filename = `${title}.csv`;

  const link = document.createElement('a');

  link.href = csvUrl;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(csvUrl);
};

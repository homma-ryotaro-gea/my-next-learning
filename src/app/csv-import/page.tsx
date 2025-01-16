import ImportCSVReader from "@/components/csv-import/ImportCSVReader";

const CsvImportPage = () => {
  return (
    <div>
      <h2>CsvImportPage</h2>
      <ImportCSVReader
        downloadFileName="CSVデータサンプル_顧問先一括データインポート_GEAREACH.csv"
        downloadUrl="/csv/clients_invite_format.csv"
      />
    </div>
  );
};

export default CsvImportPage;

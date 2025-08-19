import DocumentExportPdf from "@/components/document-export/DocumentExportPdf";
import DocumentExportWord from "@/components/document-export/DocumentExportWord";

const DocumentExportPage = () => {
	return (
		<div>
			<DocumentExportWord />
			<DocumentExportPdf />
		</div>
	);
};

export default DocumentExportPage;

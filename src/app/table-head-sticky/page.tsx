import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const TableHeadStickyPage = () => {
	return (
		<>
			<div className="h-screen" />
			{/* テーブル */}
			<div className="w-full">
				<table className="w-full min-w-[600px]">
					<TableHeader className="sticky top-12 left-0 bg-white">
						<TableRow>
							<TableHead className="w-[100px]">Invoice</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
					</TableBody>
				</table>
			</div>
			<div className="h-screen" />
		</>
	);
};

export default TableHeadStickyPage;

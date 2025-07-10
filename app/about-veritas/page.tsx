import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AboutVeritasPage() {
  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700">
        <CardHeader className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-purple-400" />
          <CardTitle className="text-white">About Veritas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300">
            <strong>Veritas Insurance</strong> is a next-generation decentralized insurance and lending platform. We bring transparency, security, and flexibility to the world of digital asset protection and yield generation.
          </p>
          <ul className="list-disc ml-5 text-slate-400">
            <li>Fully on-chain insurance annuities and endowments</li>
            <li>Collateralized NFT asset management</li>
            <li>Competitive lending and borrowing rates</li>
            <li>Secure and user-friendly dashboard</li>
          </ul>
          <div className="mt-6">
            <p className="text-slate-300 font-semibold">Our Mission</p>
            <p className="text-slate-400">
              Empower users to manage and protect their digital wealth with confidence and ease.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
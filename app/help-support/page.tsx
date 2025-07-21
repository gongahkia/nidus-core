import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function HelpSupportPage() {
  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700">
        <CardHeader className="flex items-center space-x-3">
          <HelpCircle className="h-6 w-6 text-purple-400" />
          <CardTitle className="text-white">Help & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300">
            Welcome to NIDUS Help & Support. Here you can find answers to frequently asked questions, and contact our support team for more assistance.
          </p>
          <ul className="list-disc ml-5 text-slate-400">
            <li>How to use your dashboard and manage your portfolio</li>
            <li>Getting started with lending and borrowing</li>
            <li>Understanding NFT insurance assets</li>
            <li>Troubleshooting common issues</li>
          </ul>
          <div className="mt-6">
            <p className="text-slate-300 font-semibold">Need more help?</p>
            <p className="text-slate-400">Email us at <a href="mailto:nidussg@gmail.com" className="text-purple-400 underline">nidussg@gmail.com</a> or use the in-app chat for real-time assistance.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
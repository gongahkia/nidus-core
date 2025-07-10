import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import Image from "next/image";

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

      {/* Meet the Team Section */}
      <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700 mt-10">
        <CardHeader>
          <CardTitle className="text-white text-xl">Meet the Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Richard Lei */}
            <div className="flex flex-col items-center text-center flex-1">
              <Image
                src="https://media.licdn.com/dms/image/v2/D5603AQGo_xyOewTB7g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695662262332?e=1757548800&v=beta&t=5p4MBBme3K6j8Gn74XZ6J94D9qPa_PZBYLVAtQEl0jA"
                alt="Richard Lei"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-purple-600 shadow-lg"
              />
              <div className="text-white font-semibold text-lg">Richard Lei</div>
              <div className="text-slate-400 text-sm mb-2">Founder, Business</div>
              <p className="text-slate-400 text-xs">
                Richard leads Veritas with a vision for transparent, secure, and innovative insurance solutions in the decentralized finance space.
              </p>
            </div>
            {/* Gabriel Ong */}
            <div className="flex flex-col items-center text-center flex-1">
              <Image
                src="https://media.licdn.com/dms/image/v2/D5603AQFwwQ70upxVLQ/profile-displayphoto-shrink_400_400/B56ZN9ThfrGwAg-/0/1732974090931?e=1757548800&v=beta&t=DlPQfVhmtwpxN2GBPX57teX77GTOtzyW7d-4nkUPbTk"
                alt="Gabriel Ong"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-purple-600 shadow-lg"
              />
              <div className="text-white font-semibold text-lg">Gabriel Ong</div>
              <div className="text-slate-400 text-sm mb-2">CTO, Tech Lead</div>
              <p className="text-slate-400 text-xs">
                Gabriel drives the technology and engineering at Veritas, ensuring robust, scalable, and user-centric DeFi infrastructure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
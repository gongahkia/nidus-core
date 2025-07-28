import { WithdrawalDepositComponent } from "@/components/withdrawal-deposit-strategy"

interface Props {
  params: Promise<{ vaultId: string }>  // or just `{ vaultId: string }` but with async function you await it
}

export default async function WithdrawalDepositPage({ params }: Props) {
  const { vaultId } = await params;  // await params here as it is async now
  return <WithdrawalDepositComponent vaultId={vaultId} />
}
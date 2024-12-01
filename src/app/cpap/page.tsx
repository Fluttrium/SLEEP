// pages/cpap-machines.tsx

'use state';
import CPAPMachineList from "@/components/cpapmachines";
import Footer from "@/components/footer";


export default function CPAPMachinesPage() {
  return (
    <div>
      <CPAPMachineList />
      <Footer/>
    </div>
  );
}

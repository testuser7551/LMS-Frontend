import React, {useState} from "react";
import { ChevronsUpDown, QrCode } from "lucide-react";
import AddQrCode from './AddQrCode';

const QRCode = () => {
  const headings = ["QR Code", "Name", "Type", "Scans", "Creation Date", "Status", "Action"];
  const counts = ["20", "50", "100"];
  const actions = ["Share", "Download"];
  const [addQr, setQrCode] = useState(false);

  const backQr = () => {
    setQrCode(false);
  } 
  
  return !addQr ?
    <>
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">QR Codes</h1>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" onClick={()=> {setQrCode(true)}}>
          + Create QR Code
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search with name, type, etc"
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded shadow-sm bg-white rounded-lg"
        />
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Show</span>
          <select className="border border-gray-300 p-1 rounded">
            {counts.map((it,ind) => {
              return <option key={ind}>{it}</option>
            })}
          </select>
          <span>entries</span>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              {headings.map((item, ind) => {
                return <th key={ind} className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {item}
                    <ChevronsUpDown size={10} className="text-gray-500" />
                  </div>
                </th>

              })}
            </tr>
          </thead>
          {/* <DemoComponent 
            headers={headings}
            counts={counts}
            actions={actions}
            searchBy="Qr Codes"
            defaultFilter="Qr Code"
            endPoint="/qrCode"
            loadingPoint="/showAll/qrCodes"
            noDataMsg="No Qr Codes Found"

          /> */}
          <tbody>
            <tr className="border-t hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {/* <div className="w-10 h-10 rounded flex items-center justify-center text-white text-xs font-bold"> */}
                  <QrCode size={45} className="font-bold text-gray-800" />
                {/* </div> */}
              </td>
              <td className="px-6 py-4">Mathew</td>
              <td className="px-6 py-4">Link</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4 whitespace-nowrap">25 August 2025</td>
              <td className="px-6 py-4">
                <span className="bg-green-600 text-white text-md px-4 py-2 rounded-full">Active</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button className="border px-3 py-1 rounded hover:bg-gray-200">Share</button>
                <button className="border px-3 py-1 rounded hover:bg-gray-200">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-gray-600 space-y-3 md:space-y-0">
        <div>Showing 1 – 1 of 1 results</div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-200">&lt;</button>
          <span className="px-3 py-1 border rounded bg-black text-white">1</span>
          <button className="px-3 py-1 border rounded hover:bg-gray-200">&gt;</button>
        </div>
      </div> 
      </div>
    </> : <AddQrCode closeQr={() => {backQr()}} />
};

export default QRCode;
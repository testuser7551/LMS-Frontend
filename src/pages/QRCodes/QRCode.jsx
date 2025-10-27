import React, { useState, useEffect, useRef, useContext } from "react";
import { Share2, Download, MoreVertical, QrCode } from "lucide-react";
import AddQrCode from './AddQrCode';
import { getAllQrCodes, deleteQrCode, handleToggleStatus } from "../../api/QrCode/QrCode";
import DownloadQrModal from "./Components/DownloadQrModal";
import ShareQrModal from "./Components/ShareQrModal";
import { AuthContext } from '../../context/AuthContext';
import { showToast } from "../../components/toast";
import { Edit, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const QRCodeComponent = () => {
  const { user } = useContext(AuthContext);
  const headings = ["QR Code", "Name", "Type", "Creation Date", "Status", "Action"];
const [page, setPage] = useState(1);
const [totalCount, setTotalCount] = useState(0);
//const limit = 6;
  const [addQr, setAddQr] = useState(false);
  const [qrList, setQrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrIdToEdit, setQrIdToEdit] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  //const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [downloadQrModalOpen, setDownloadQrModalOpen] = useState(false);
  const [selectedQrUrl, setSelectedQrUrl] = useState("");
  const [selectedQrName, setSelectedQrName] = useState("");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const menuRefs = useRef({});

//   const handlePageChange = (newPage) => {
//   if (newPage < 1 || newPage > Math.ceil(totalCount / limit)) return;
//   setPage(newPage);
// };
const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Use totalPages instead of calculation
    setPage(newPage);
  };
  const fetchQrCodes = async () => {
  try {
    setLoading(true);
    
    // ALL users (including admin) only see their own QR codes
    const userId = user._id; // Get user ID from context
    
    const response = await getAllQrCodes(page, limit, userId);
    setQrList(response.data || []);
    setTotalPages(response.pagination?.totalPages || 1);
    setTotalCount(response.pagination?.total || 0);
  } catch (err) {
    console.error("Error fetching QR codes:", err);
    setQrList([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchQrCodes();
  }, [page, limit]);

  const backQr = () => {
    setAddQr(false);
    fetchQrCodes();
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this QR code?")) return;
    try {
      await deleteQrCode(id);
      showToast("QR Code deleted successfully!", "top-center", 10000, "dark");
      fetchQrCodes();
    } catch (err) {
      console.error("Error deleting QR:", err);
    }
  };

  const handleEdit = (id) => {
    setQrIdToEdit(id);
    setAddQr(true);
  };

  const openDownloadModal = (qr) => {
    setSelectedQrUrl(`${API_BASE}/uploads/QrCodes/${qr.qrImage}`);
    setSelectedQrName(qr.content?.qrName || "QR Code");
    setDownloadQrModalOpen(true);
  };

  const handleToggle = async (id) => {
    try {
      await handleToggleStatus(id);
      fetchQrCodes();
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleShare = (link) => {
    setShareLink(link);
    setShareModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpenId && menuRefs.current[menuOpenId] && !menuRefs.current[menuOpenId].contains(event.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpenId]);

  const Pagination = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50  disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
        disabled={page <= 1}
        onClick={() => setPage(prev => prev - 1)}
      >
        Previous
      </button>
      <span className="text-sm font-medium text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
        disabled={page >= totalPages}
        onClick={() => setPage(prev => prev + 1)}
      >
        Next
      </button>
    </div>
  );

  return !addQr ? (
    <div className="p-4 sm:p-6 space-y-6 w-full max-w-[95vw] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center md:text-left w-full md:w-auto">
          QR Codes
        </h1>
    
    <button
      className="bg-black text-white px-4 sm:px-5 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 w-full md:w-auto"
      onClick={() => {
        setAddQr(true);
        setQrIdToEdit(null);
      }}
    >
      + Create QR Code
    </button>

      </div>

      {/* Limit Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
        <div></div>
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm">Show:</label>
          <select
            id="limit"
            className="border rounded px-2 py-1 text-sm"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      {/* <div className="bg-white shadow rounded-xl w-full  overflow-hidden"> */}
      <div className="bg-white shadow rounded-xl w-full max-w-[95vw] mx-auto p-4 sm:p-6 overflow-hidden space-y-6">

        {/* ✅ Desktop & Tablet View */}
        <div className="hidden md:block w-full">
          {/* <table className="w-full text-sm text-center">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
  <tr>
    {headings.map((item, ind) => (
      <th
        key={ind}
        className="px-4 py-3 whitespace-nowrap text-center" // <- change text-left to text-center
      >
        {item}
      </th>
    ))}
  </tr>
</thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={headings.length} className="text-center py-6">Loading...</td>
                </tr>
              ) : qrList.length === 0 ? (
                <tr>
                  <td colSpan={headings.length} className="text-center py-6">No QR Codes Found</td>
                </tr>
              ) : (
                qrList.map(qr => (
                  <tr key={qr._id} className="border-t hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3">
                      {qr.qrImage ? (
                        <img
                          src={`${API_BASE}/uploads/QrCodes/${qr.qrImage}`}
                          alt={qr.content?.qrName}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                          <QrCode size={30} className="text-gray-800" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 break-words">{qr.content?.qrName}</td>
                    <td className="px-4 py-3">{qr.qrMode}</td>
                    <td className="px-4 py-3">{new Date(qr.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-white text-xs sm:text-sm px-3 py-1 rounded-full ${qr.status ? "bg-green-600" : "bg-gray-400"}`}>
                        {qr.status ? "Active" : "Paused"}
                      </span>
                    </td>
                


                    <td className="px-4 py-3 whitespace-nowrap">
  <div className="flex flex-nowrap items-center justify-start gap-1 md:gap-2 xl:gap-3">

    <button
      onClick={() => handleShare(`${API_BASE}/uploads/QrCodes/${qr.qrImage}`)}
      className="flex items-center gap-1 px-2 md:px-2.5 xl:px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm whitespace-nowrap"
    >
      <Share2 size={16} />

      <span className="hidden xl:inline">Share</span>
    </button>

    <button
      onClick={() => openDownloadModal(qr)}
      className="flex items-center gap-1 px-2 md:px-2.5 xl:px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm whitespace-nowrap"
    >
      <Download size={16} />
      <span className="hidden xl:inline">Download</span>
    </button>


<div className="relative" ref={el => (menuRefs.current[qr._id] = el)}>
  <button
    className="p-2 rounded hover:bg-gray-100 whitespace-nowrap"
    onClick={() =>
      setMenuOpenId(menuOpenId === qr._id ? null : qr._id)
    }
  >
    <MoreVertical size={18} />
  </button>

  {menuOpenId === qr._id && (
    <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20 flex flex-col">
      <button
        className="px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => {
          handleEdit(qr._id);
          setMenuOpenId(null);
        }}
      >
        Edit
      </button>
      <button
        className="px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => {
          handleDelete(qr._id);
          setMenuOpenId(null);
        }}
      >
        Delete
      </button>
      <button
        className="px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => {
          handleToggle(qr._id);
          setMenuOpenId(null);
        }}
      >
        {qr.status ? "Pause" : "Activate"}
      </button>
    </div>
  )}
</div>

  </div>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table> */}
          <table className="w-full text-sm text-center">
  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
    <tr>
      {headings.map((item, ind) => (
        <th
          key={ind}
          className="px-4 py-3 whitespace-nowrap text-center"
        >
          {item}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {loading ? (
      <tr>
        <td colSpan={headings.length} className="text-center py-6">
          Loading...
        </td>
      </tr>
    ) : qrList.length === 0 ? (
      <tr>
        <td colSpan={headings.length} className="text-center py-6">
          No QR Codes Found
        </td>
      </tr>
    ) : (
      qrList.map((qr) => (
        <tr
          key={qr._id}
          className="border-t hover:bg-gray-50 transition-colors duration-150"
        >
          <td className="px-4 py-3 text-center">
            {qr.qrImage ? (
              <img
                src={`${API_BASE}/uploads/QrCodes/${qr.qrImage}`}
                alt={qr.content?.qrName}
                className="w-12 h-12 object-cover rounded mx-auto"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded mx-auto">
                <QrCode size={30} className="text-gray-800" />
              </div>
            )}
          </td>
          <td className="px-4 py-3 break-words text-center">{qr.content?.qrName}</td>
          <td className="px-4 py-3 text-center">{qr.qrMode}</td>
          <td className="px-4 py-3 text-center">{new Date(qr.createdAt).toLocaleDateString()}</td>
          <td className="px-4 py-3 text-center">
            <span
              className={`text-white text-xs sm:text-sm px-3 py-1 rounded-full ${
                qr.status ? "bg-green-600" : "bg-gray-400"
              }`}
            >
              {qr.status ? "Active" : "Paused"}
            </span>
          </td>

          <td className="px-4 py-3 whitespace-nowrap text-center">
            <div className="flex flex-nowrap items-center justify-center gap-1 md:gap-2 xl:gap-3">
              {/* Share Button */}
              <button
                onClick={() => handleShare(`${API_BASE}/uploads/QrCodes/${qr.qrImage}`)}
                className="flex items-center gap-1 px-2 md:px-2.5 xl:px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm whitespace-nowrap"
              >
                <Share2 size={16} />
                <span className="hidden xl:inline">Share</span>
              </button>

              {/* Download Button */}
              <button
                onClick={() => openDownloadModal(qr)}
                className="flex items-center gap-1 px-2 md:px-2.5 xl:px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm whitespace-nowrap"
              >
                <Download size={16} />
                <span className="hidden xl:inline">Download</span>
              </button>

              {/* 3-dot Menu */}
              <div className="relative" ref={(el) => (menuRefs.current[qr._id] = el)}>
                <button
                  className="p-2 rounded hover:bg-gray-100 whitespace-nowrap"
                  onClick={() =>
                    setMenuOpenId(menuOpenId === qr._id ? null : qr._id)
                  }
                >
                  <MoreVertical size={18} />
                </button>

                {menuOpenId === qr._id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20 flex flex-col">
                    <button
                      className="px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        handleEdit(qr._id);
                        setMenuOpenId(null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        handleDelete(qr._id);
                        setMenuOpenId(null);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        handleToggle(qr._id);
                        setMenuOpenId(null);
                      }}
                    >
                      {qr.status ? "Pause" : "Activate"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

        </div>

        {/* ✅ Mobile View */}
        <div className="block md:hidden">
          {loading ? (
            <div className="text-center py-6">Loading...</div>
          ) : qrList.length === 0 ? (
            <div className="text-center py-6">No QR Codes Found</div>
          ) : (
            qrList.map(qr => (
              <div key={qr._id} className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    {qr.qrImage ? (
                      <img
                        src={`${API_BASE}/uploads/QrCodes/${qr.qrImage}`}
                        alt={qr.content?.qrName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                        <QrCode size={30} className="text-gray-800" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm">{qr.content?.qrName}</p>
                      <p className="text-xs text-gray-500">{qr.qrMode}</p>
                    </div>
                  </div>
                  <span className={`text-white text-xs px-3 py-1 rounded-full ${qr.status ? "bg-green-600" : "bg-gray-400"}`}>
                    {qr.status ? "Active" : "Paused"}
                  </span>
                </div>
                <p className="text-xs mt-2 text-gray-500">Created: {new Date(qr.createdAt).toLocaleDateString()}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => handleShare(`${API_BASE}/uploads/QrCodes/${qr.qrImage}`)} className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">
                    <Share2 size={12} /> Share
                  </button>
                  <button onClick={() => openDownloadModal(qr)} className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">
                    <Download size={12} /> Download
                  </button>
                  <button onClick={() => handleEdit(qr._id)} className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(qr._id)} className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">
                    Delete
                  </button>
                  <button onClick={() => handleToggle(qr._id)} className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">
                    {qr.status ? "Pause" : "Activate"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

<div className="flex justify-end items-center m-4 gap-6">
  <button
    onClick={() => handlePageChange(page - 1)}
    disabled={page === 1}
    className="px-2 py-2 bg-black rounded-lg disabled:opacity-50 cursor-pointer"
  >
    <ChevronLeft size={20} className="text-white" />
  </button>

  <span className="text-sm text-secondary">
    Page {page} of {totalPages} 
  </span>

  <button
    onClick={() => handlePageChange(page + 1)}
    disabled={page >= totalPages}
    className="px-2 py-2 bg-black rounded-lg disabled:opacity-50 cursor-pointer"
  >
    <ChevronRight size={20} className="text-white" />
  </button>
</div>
        {/* <Pagination /> */}
      </div>

      {/* Modals */}
      <DownloadQrModal
        isOpen={downloadQrModalOpen}
        onClose={() => setDownloadQrModalOpen(false)}
        qrImageUrl={selectedQrUrl}
        qrName={selectedQrName}
      />
      <ShareQrModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        qrLink={shareLink}
      />
    </div>
  ) : (
    <AddQrCode closeQr={backQr} editQrId={qrIdToEdit} />
  );
};

export default QRCodeComponent;

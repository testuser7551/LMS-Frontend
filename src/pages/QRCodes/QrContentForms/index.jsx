import LinkForm from "./LinkForm";
import DigitalCardForm from "./DigitalCardForm";
import VCardForm from "./VCardForm";
import EmailForm from "./EmailForm";
import CallForm from "./CallForm";
import SmsForm from "./SmsForm";
import WhatsAppForm from "./WhatsAppForm";
import TextForm from "./TextForm";
import WifiForm from "./WifiForm";
import CertificateForm from "./CertificateForm"
const QrForms = {
  link: LinkForm,
  digitalCard: DigitalCardForm,
  vCard: VCardForm,
  email: EmailForm,
  call: CallForm,
  sms: SmsForm,
  whatsApp: WhatsAppForm,
  text: TextForm,
  wifi: WifiForm,
  certificate: CertificateForm,
};

export default QrForms;

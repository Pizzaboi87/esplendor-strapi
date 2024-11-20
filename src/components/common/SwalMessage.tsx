import Swal from "sweetalert2";

interface SwalProps {
  title: string;
  message: string;
}

export const SwalMessage = ({ title, message }: SwalProps) =>
  Swal.fire({
    title: title,
    text: message,
    showClass: {
      popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
    },
    hideClass: {
      popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
    },
  });

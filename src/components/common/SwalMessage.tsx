import Swal from "sweetalert2";

type SwalProps = {
  title: string;
  message: string;
};

type SwalPropsMulti = {
  denyText: string;
  confirmText: string;
} & SwalProps;

export const SwalMessage = ({ title, message }: SwalProps) =>
  Swal.fire({
    title: title,
    html: message,
    allowEscapeKey: false,
    allowOutsideClick: false,
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

export const SwalMessageMulti = ({
  title,
  message,
  denyText,
  confirmText,
}: SwalPropsMulti) =>
  Swal.fire({
    title: title,
    html: message,
    showDenyButton: true,
    confirmButtonText: confirmText,
    denyButtonText: denyText,
    allowEscapeKey: false,
    allowOutsideClick: false,
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

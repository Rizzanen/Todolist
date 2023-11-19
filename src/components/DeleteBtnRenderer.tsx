import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";

function DeleteBtnRenderer(props: any) {
  const { onClick } = props;

  const handleDelete = () => {
    onClick();
  };

  return (
    <Button
      className="deleteButton"
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}

export default DeleteBtnRenderer;

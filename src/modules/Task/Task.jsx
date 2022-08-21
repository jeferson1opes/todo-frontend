import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Task({ task, handleCompleteTask, handleDeleteTask }) {
  return (
    <>
      <div>
        <Checkbox
          onChange={() => handleCompleteTask(task.id)}
          disabled={task.completedAt}
          checked={task.completedAt}
        />
        {task.completedAt ? (
          <Tooltip
            arrow
            placement="right"
            title={
              <>
                <Typography variant="caption">
                  {`Created at: ${new Date(task.createdAt).toUTCString()}`}
                </Typography>
                <br />
                <Typography variant="caption">
                  {`Completed at: ${new Date(task.completedAt).toUTCString()}`}
                </Typography>
              </>
            }
          >
            <Typography variant="caption">{task.description}</Typography>
          </Tooltip>
        ) : (
          <Typography variant="caption">{task.description}</Typography>
        )}
        {!task.completedAt && (
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDeleteTask(task.id);
            }}
            size="small"
            color="primary"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </>
  );
}

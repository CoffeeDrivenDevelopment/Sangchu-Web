import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

type InputProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onClick: (e: React.FormEvent) => void;
};

function CommentInput({ setContent, content, onClick }: InputProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: '0.5vh',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: '1.5vh',
        borderRadius: '10px',
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontFamily: 'NanumSquareRoundB',
          '&.Mui-focused fieldset': {
            borderColor: 'black',
          },
        }}
        placeholder="내용을 입력해 주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} onClick={onClick}>
        <KeyboardReturnIcon />
      </IconButton>
    </Paper>
  );
}

export default CommentInput;

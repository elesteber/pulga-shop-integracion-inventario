import { Typography, Box } from "@mui/material";
import { StyledCard, StyledCardContent, StyledTypography } from "./Card";

interface EmptyStateProps {
  title: string;
  body: string;
}

export default function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className="h-[80vh]">
      <StyledCard variant="outlined" tabIndex={0}>
        <StyledCardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Box textAlign="center">
            <Typography gutterBottom variant="h3" component="div">
              {title}
            </Typography>
            <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                whiteSpace: "pre-line",
              }}
            >
              {body}
            </StyledTypography>
          </Box>
        </StyledCardContent>
      </StyledCard>
    </div>
  );
}

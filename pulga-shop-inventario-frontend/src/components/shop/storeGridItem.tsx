import { Link } from "react-router-dom";

import { Typography, Grid2, CardMedia } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { Button } from "@mui/material";

import { CreateShopResponse } from "../../api/shop/createShop";
import { StyledCard, StyledCardContent, StyledTypography } from "../Card";

import picture1 from "../../assets/images/store_images/blue.jpg";
import picture2 from "../../assets/images/store_images/blue2.jpg";
import picture3 from "../../assets/images/store_images/dark_blue.jpg";
import picture4 from "../../assets/images/store_images/light_pink.jpg";
import picture5 from "../../assets/images/store_images/orange.jpg";
import picture6 from "../../assets/images/store_images/pink.jpg";

const images = [picture1, picture2, picture3, picture4, picture5, picture6];

function getRandomPicture(name: string) {
  const normalizedName = name.toLowerCase().replace(/[^a-z]/g, "");

  let hash = 0;
  for (let i = 0; i < normalizedName.length; i++) {
    hash += normalizedName.charCodeAt(i);
  }

  return images[hash % images.length];
}

interface StoreGridItem {
  data: CreateShopResponse;
}

export function StoreGridItem({ data }: StoreGridItem) {
  const randomPicture = getRandomPicture(data.nombre);

  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      <StyledCard>
        <CardMedia
          component="img"
          alt="green iguana"
          image={randomPicture}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.nombre}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {data.descripcion}
          </StyledTypography>
          <Button
            component={Link}
            to={`/app/tiendas/${data.id_tienda}`}
            startIcon={<ArrowRight />}
            variant="outlined"
          >
            Ir a la Tienda
          </Button>
        </StyledCardContent>
      </StyledCard>
    </Grid2>
  );
}

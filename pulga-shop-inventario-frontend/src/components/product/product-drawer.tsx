import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";
import NotesIcon from "@mui/icons-material/Notes";
import LabelIcon from "@mui/icons-material/Label";
import InventoryIcon from "@mui/icons-material/Inventory";
import PinIcon from "@mui/icons-material/Pin";
import CategoryIcon from "@mui/icons-material/Category";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import HeightIcon from "@mui/icons-material/Height";
import StraightenIcon from "@mui/icons-material/Straighten";

import { Product } from "../../types/api";

interface DrawerItemProps {
  name: string;
  text: string;
  icon: React.ReactNode;
}

function DrawerItem({ name, text, icon }: DrawerItemProps) {
  return (
    <ListItem disablePadding sx={{ marginY: 0.2 }}>
      <Box sx={{ paddingRight: 2 }}>{icon}</Box>
      <ListItemText
        primary={
          <Typography variant="body1" fontSize={14}>
            {name}
          </Typography>
        }
        color="secondary"
      />
      <Box sx={{ fontWeight: "bold" }}>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </ListItem>
  );
}
interface ProductDrawerProps {
  open: boolean;
  toggleDrawer: (v: boolean) => void;
  product: Product | null;
}

export default function ProductDrawer({
  open,
  toggleDrawer,
  product,
}: ProductDrawerProps) {
  if (!product) return null;

  const defaultPicture =
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d";

  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{ width: 400, padding: 2, paddingX: 3 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            marginBottom: 2,
          }}
        >
          <div>
            <Typography variant="h4" gutterBottom>
              {product.nombre}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              SKU: {product.sku}
            </Typography>
          </div>
        </Box>

        <List style={{ padding: 0 }}>
          <DrawerItem
            name="Descripción"
            text={product.descripcion}
            icon={<NotesIcon />}
          />
          <DrawerItem name="Marca" text={product.marca} icon={<MailIcon />} />
          <DrawerItem
            name="Costo"
            text={String(product.costo)}
            icon={<LabelIcon />}
          />
          <DrawerItem
            name="Condición"
            text={product.condicion}
            icon={<InventoryIcon />}
          />
          <DrawerItem
            name="Stock"
            text={String(product.stock)}
            icon={<PinIcon />}
          />
          <DrawerItem
            name="Categoría"
            text={String(product.categoria)}
            icon={<CategoryIcon />}
          />
          <DrawerItem
            name="Peso"
            text={String(product.peso)}
            icon={<LineWeightIcon />}
          />
          <DrawerItem
            name="Alto"
            text={String(product.alto)}
            icon={<HeightIcon />}
          />
          <DrawerItem
            name="Largo"
            text={String(product.largo)}
            icon={<StraightenIcon />}
          />
          <DrawerItem
            name="Ancho"
            text={String(product.ancho)}
            icon={<StraightenIcon />}
          />
        </List>
        <Divider />
        <p>Foto de referencia</p>
        <div>
          <div className="aspect-square">
            <img src={product.foto_referencia || defaultPicture} />
          </div>
        </div>
      </Box>
    </Drawer>
  );
}

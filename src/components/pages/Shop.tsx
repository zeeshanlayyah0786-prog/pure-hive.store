import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, ShoppingCart, Download, Star, Package, FileText, Trash2, CreditCard, CheckCircle2, Smartphone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  type: "physical" | "digital";
  rating: number;
  downloads?: string;
  stock?: number;
  description: string;
}

const products: Product[] = [
  {
    id: "p1",
    title: "Bloom Stitch Pattern Treasury",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    price: 12.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "2.5K",
    description: "A blooming library of 50+ floral, animal, and geometric motifs with printable templates, stitch guides, and palettes.",
  },
  {
    id: "p2",
    title: "Petal & Paper Flower Workshop",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
    price: 9.99,
    category: "Paper Crafts",
    type: "digital",
    rating: 4.9,
    downloads: "3.2K",
    description: "Thirty lifelike paper blooms — roses, peonies, daisies — each with step-by-step assembly photos.",
  },
  {
    id: "p3",
    title: "Resin Blossoms Starter Kit",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    price: 34.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.7,
    stock: 45,
    description: "Molds, crystal-clear resin, pigments, and tools, plus a printed guide to your very first pair of earrings.",
  },
  {
    id: "p4",
    title: "Knot Garden Cord Collection",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    price: 24.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 120,
    description: "Five farmhouse shades of 3mm cotton cord — 100 yards per spool — perfect for wall hangings and plant hangers.",
  },
  {
    id: "p5",
    title: "Cuddle Creatures Crochet Book",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    price: 15.99,
    category: "Sewing & Crochet",
    type: "digital",
    rating: 4.9,
    downloads: "4.1K",
    description: "Twenty-five cuddly animals and characters with stitch diagrams and easy assembly notes.",
  },
  {
    id: "p6",
    title: "Garden Hues Watercolor Set",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 29.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 78,
    description: "A studio-grade range of 48 vibrant pans with travel brushes and a folding mixing tray.",
  },
  {
    id: "p7",
    title: "Season by Season Craft Journal",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    price: 8.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.5,
    downloads: "2.8K",
    description: "A month-by-month crafting journal with seasonal themes, supply lists, and project guides.",
  },
  {
    id: "p8",
    title: "Sunny Days Kids' Craft Book",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    price: 10.99,
    category: "Kids Crafts",
    type: "digital",
    rating: 4.7,
    downloads: "3.5K",
    description: "Over 100 printable activities for ages 4–12, from paper crafts to nature scavenger hunts.",
  },
  {
    id: "p9",
    title: "Petal Clay Tool Collection",
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80",
    price: 18.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.6,
    stock: 92,
    description: "Fifteen precision tools for shaping, texturing, and fine-detail polymer clay work.",
  },
  {
    id: "p10",
    title: "Paper Garden Origami Pack",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    price: 14.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.8,
    stock: 156,
    description: "Five hundred crisp sheets in fifty colors and patterns that fold cleanly every time.",
  },
  {
    id: "p11",
    title: "Warm Wraps Knitting Library",
    image: "https://images.unsplash.com/photo-1586339277861-b0b895343ba5?w=800&q=80",
    price: 11.99,
    category: "Sewing & Crochet",
    type: "digital",
    rating: 4.7,
    downloads: "2.9K",
    description: "Forty patterns for scarves, hats, sweaters, and blankets, graded for every skill level.",
  },
  {
    id: "p12",
    title: "Bright Stroke Acrylic Set",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 22.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.5,
    stock: 88,
    description: "Richly pigmented acrylics for canvas, wood, and mixed-media creations.",
  },
  {
    id: "p13",
    title: "Whimsy Sticker Treasury",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 7.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.9,
    stock: 200,
    description: "1,000+ journaling and scrapbooking stickers in illustrated and gold-foil styles.",
  },
  {
    id: "p14",
    title: "Petal & Gem Mold Set",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 16.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.7,
    stock: 67,
    description: "Jewelry, coaster, and keychain molds that release cleanly with every pour.",
  },
  {
    id: "p15",
    title: "Heritage Cross Stitch Charts",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 13.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "3.1K",
    description: "Sixty timeless charts from beginner to advanced with full-color keys.",
  },
  {
    id: "p16",
    title: "Soft Petal Felt Bundle",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    price: 12.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.6,
    stock: 145,
    description: "Fifty soft felt sheets in a rainbow of shades for plushies and play crafts.",
  },
  {
    id: "p17",
    title: "Flourish & Bloom Lettering Guide",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    price: 6.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.5,
    downloads: "4.2K",
    description: "Printable drills and alphabets in three modern calligraphy styles.",
  },
  {
    id: "p18",
    title: "Bead Garden Deluxe Kit",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    price: 28.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 73,
    description: "2,000+ beads, findings, wire, and tools organized in a tidy storage case.",
  },
  {
    id: "p19",
    title: "Joyful Cards Template Pack",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    price: 8.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.9,
    downloads: "5.1K",
    description: "Fifty editable card designs for every holiday on the calendar.",
  },
  {
    id: "p20",
    title: "Ember Line Wood Burning Kit",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 32.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 54,
    description: "Temperature-controlled pen with twenty tips for detailed wood burning.",
  },
  {
    id: "p21",
    title: "Paper Curls Quilling Set",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 9.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.8,
    stock: 112,
    description: "Forty colors of pre-cut strips for paper filigree art.",
  },
  {
    id: "p22",
    title: "At Home Sewing Patterns",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    price: 14.99,
    category: "Sewing & Crochet",
    type: "digital",
    rating: 4.7,
    downloads: "2.7K",
    description: "Thirty-five patterns for garments, bags, and home textiles.",
  },
  {
    id: "p23",
    title: "Twinkle Touch Glitter Glue",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    price: 11.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.5,
    stock: 98,
    description: "Twelve non-toxic shimmer glues for cards and school projects.",
  },
  {
    id: "p24",
    title: "Bloom Drops Resin Pigments",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 19.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.8,
    stock: 81,
    description: "Twenty-four concentrated pigments for vivid resin color mixing.",
  },
  {
    id: "p25",
    title: "Day by Day Planner Stickers",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 5.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.9,
    downloads: "6.3K",
    description: "500+ printable functional and decorative planner stickers.",
  },
  {
    id: "p26",
    title: "Fabric Bloom Paint Set",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 17.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.6,
    stock: 65,
    description: "Permanent, machine-washable fabric paints for clothing and bags.",
  },
  {
    id: "p27",
    title: "Welcome Wreath Craft Box",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    price: 26.99,
    category: "Seasonal Crafts",
    type: "physical",
    rating: 4.7,
    stock: 42,
    description: "Frames, ribbons, and greenery to build your first showpiece wreath.",
  },
  {
    id: "p28",
    title: "Garden Dreams Coloring Book",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    price: 7.99,
    category: "Kids Crafts",
    type: "digital",
    rating: 4.8,
    downloads: "4.5K",
    description: "Printable coloring pages in whimsical themes for all ages.",
  },
  {
    id: "p29",
    title: "Heritage Leather Tool Kit",
    image: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800&q=80",
    price: 38.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.5,
    stock: 38,
    description: "Stamps, punches, needles, and edge tools for handcrafted leatherwork.",
  },
  {
    id: "p30",
    title: "Fresh Palette Cardstock Pack",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 13.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.7,
    stock: 128,
    description: "Twenty-five rich colors of premium cardstock for card making.",
  },
  {
    id: "p31",
    title: "Comfort Grip Crochet Hooks",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    price: 15.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.9,
    stock: 95,
    description: "Cushioned crochet hooks in a roll-up travel case.",
  },
  {
    id: "p32",
    title: "Maker's Cut File Library",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 12.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "3.8K",
    description: "Cutting machine designs for Cricut and Silhouette projects.",
  },
  {
    id: "p33",
    title: "Glass Finish Epoxy Resin",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 29.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.7,
    stock: 58,
    description: "Bubble-free epoxy for jewelry, art, and durable coatings.",
  },
  {
    id: "p34",
    title: "Pom Pom Garden Makers",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    price: 8.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.6,
    stock: 142,
    description: "Four pom-pom maker sizes for fluffy trims and garlands.",
  },
  {
    id: "p35",
    title: "Botanical Wash Art Prints",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 10.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.9,
    downloads: "4.7K",
    description: "Hand-painted floral designs for digital and print projects.",
  },
  {
    id: "p36",
    title: "Soft Sculpt Needle Felting",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80",
    price: 24.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 71,
    description: "Wool roving, felting needles, and a foam pad for sculpting soft critters.",
  },
  {
    id: "p37",
    title: "Festive Ornament Workshop",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    price: 9.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.8,
    downloads: "5.6K",
    description: "Fifty DIY Christmas ornament templates with instructions.",
  },
  {
    id: "p38",
    title: "Paper Glaze Decoupage Set",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    price: 16.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 89,
    description: "Five Mod Podge finishes for decoupage, sealing, and top coats.",
  },
  {
    id: "p39",
    title: "Paper Petal Punch Set",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 14.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.7,
    stock: 103,
    description: "Decorative paper punches for scrapbooking edges and accents.",
  },
  {
    id: "p40",
    title: "Patchwork Heritage Quilts",
    image: "https://images.unsplash.com/photo-1586339277861-b0b895343ba5?w=800&q=80",
    price: 16.99,
    category: "Sewing & Crochet",
    type: "digital",
    rating: 4.8,
    downloads: "2.4K",
    description: "Thirty quilting patterns from traditional to modern.",
  },
  {
    id: "p41",
    title: "Vintage Bloom Chalk Paints",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 27.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.5,
    stock: 62,
    description: "Velvety matte chalk paints made for giving old furniture a fresh chapter.",
  },
  {
    id: "p42",
    title: "Stardust Resin Glitters",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 12.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.8,
    stock: 94,
    description: "Fine glitter mix in twenty colors formulated especially for resin pours.",
  },
  {
    id: "p43",
    title: "Celebration Printable Pack",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    price: 8.99,
    category: "Kids Crafts",
    type: "digital",
    rating: 4.9,
    downloads: "5.9K",
    description: "Banners, invitations, and decorations — one complete party printable set.",
  },
  {
    id: "p44",
    title: "Bloom Stripe Washi Tapes",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 18.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.7,
    stock: 136,
    description: "Twenty-four decorative washi tape rolls in playful patterns and colors.",
  },
  {
    id: "p45",
    title: "Rainbow Floss Chest",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    price: 21.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 87,
    description: "One hundred embroidery floss colors packed in a boxed organizer.",
  },
  {
    id: "p46",
    title: "Bloom & Line Wall Art",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 11.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.6,
    downloads: "3.9K",
    description: "Fifty modern art prints ready to download, print, and frame.",
  },
  {
    id: "p47",
    title: "Hot & Handy Glue Kit",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    price: 13.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.5,
    stock: 118,
    description: "High-temp glue gun with fifty glue sticks included in the box.",
  },
  {
    id: "p48",
    title: "Sparkle Findings Box",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    price: 15.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.7,
    stock: 76,
    description: "200+ chains, clasps, and jump rings for jewelry assembly.",
  },
  {
    id: "p49",
    title: "Spring Basket Craft Pack",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    price: 7.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.8,
    downloads: "4.1K",
    description: "Forty Easter-themed craft templates and decoration ideas.",
  },
  {
    id: "p50",
    title: "True Grid Cutting Mat",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 19.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.9,
    stock: 84,
    description: "Self-healing cutting mat with printed grid lines for precise work.",
  },
  {
    id: "p51",
    title: "Yarn Meadow Bundle",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    price: 32.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 69,
    description: "Twenty soft acrylic skeins in a meadow of assorted colors.",
  },
  {
    id: "p52",
    title: "Ever After Invitation Set",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 14.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.9,
    downloads: "3.3K",
    description: "Elegant wedding suites with RSVP cards and thank-you notes.",
  },
  {
    id: "p53",
    title: "Stencil Garden Collection",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 16.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 91,
    description: "Reusable stencils for painting and home decor makeovers.",
  },
  {
    id: "p54",
    title: "Sun Cure UV Resin",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 18.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.8,
    stock: 63,
    description: "Fast-curing UV resin for small jewelry projects.",
  },
  {
    id: "p55",
    title: "Foam Bloom Sheets",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    price: 10.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.7,
    stock: 157,
    description: "Forty foam sheets in bright shades for kids projects.",
  },
  {
    id: "p56",
    title: "Bright Page Journal Kit",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 9.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "5.2K",
    description: "100+ journal page templates and habit trackers.",
  },
  {
    id: "p57",
    title: "True Cut Rotary Blade",
    image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&q=80",
    price: 22.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.6,
    stock: 72,
    description: "Rotary cutter with five replacement blades.",
  },
  {
    id: "p58",
    title: "Harvest Wreath Guide",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    price: 8.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.7,
    downloads: "3.7K",
    description: "Twenty-five fall wreath designs with material lists.",
  },
  {
    id: "p59",
    title: "Fresh Coat Spray Paints",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 34.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.5,
    stock: 47,
    description: "Twelve aerosol colors for bold, fast coverage.",
  },
  {
    id: "p60",
    title: "Cut & Create Machine Kit",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 28.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.8,
    stock: 55,
    description: "Accessories for Cricut and Silhouette machines.",
  },
  {
    id: "p61",
    title: "Natural Wood Needle Set",
    image: "https://images.unsplash.com/photo-1586339277861-b0b895343ba5?w=800&q=80",
    price: 26.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 68,
    description: "Bamboo knitting needles in ten sizes with a roll-up case.",
  },
  {
    id: "p62",
    title: "Signature Logo Templates",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 15.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.6,
    downloads: "2.8K",
    description: "200 editable logo templates for small business branding.",
  },
  {
    id: "p63",
    title: "Ink Bloom Alcohol Inks",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 21.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.8,
    stock: 79,
    description: "Twelve vibrant alcohol inks for resin and mixed media.",
  },
  {
    id: "p64",
    title: "Fuzzy Stem Craft Pack",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    price: 9.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.6,
    stock: 168,
    description: "Five hundred pipe cleaners in assorted colors.",
  },
  {
    id: "p65",
    title: "Fresh Feed Template Pack",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 12.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.9,
    downloads: "6.8K",
    description: "300+ post templates for Instagram, Facebook, and Pinterest.",
  },
  {
    id: "p66",
    title: "Tailor's Bloom Shears",
    image: "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&q=80",
    price: 17.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 93,
    description: "Sharp, ergonomic fabric scissors for clean cuts.",
  },
  {
    id: "p67",
    title: "Love Notes Craft Pack",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    price: 7.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.7,
    downloads: "4.4K",
    description: "Thirty-five Valentine's Day craft ideas and templates.",
  },
  {
    id: "p68",
    title: "Woodland Stain Palette",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 29.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 51,
    description: "Interior wood stain in six popular finishes.",
  },
  {
    id: "p69",
    title: "Print & Pattern Paper Pack",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 14.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.7,
    stock: 124,
    description: "180 double-sided scrapbook paper sheets.",
  },
  {
    id: "p70",
    title: "Tapestry Garden Yarns",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    price: 19.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 82,
    description: "Fifty colors of tapestry yarn for needlepoint projects.",
  },
  {
    id: "p71",
    title: "Hello There Card Designs",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 10.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "3.6K",
    description: "100 professional business card designs.",
  },
  {
    id: "p72",
    title: "Clean Pour Mixing Set",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 11.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.6,
    stock: 105,
    description: "Graduated mixing cups with stir sticks.",
  },
  {
    id: "p73",
    title: "Silly Eyes Craft Pack",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    price: 8.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.9,
    stock: 189,
    description: "1,000 self-adhesive googly eyes in assorted sizes.",
  },
  {
    id: "p74",
    title: "Kitchen Story Card Set",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 6.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.7,
    downloads: "4.9K",
    description: "Beautiful printable recipe card designs.",
  },
  {
    id: "p75",
    title: "Gentle Undo Seam Tools",
    image: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80",
    price: 7.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.5,
    stock: 147,
    description: "Precision seam rippers in three sizes.",
  },
  {
    id: "p76",
    title: "Moonlight Craft Collection",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    price: 9.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.8,
    downloads: "5.3K",
    description: "Fifty Halloween decoration templates.",
  },
  {
    id: "p77",
    title: "Smooth Finish Sanding Kit",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 12.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 96,
    description: "Fifty sandpaper sheets in various grits.",
  },
  {
    id: "p78",
    title: "Heritage Rubber Stamps",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 18.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.7,
    stock: 77,
    description: "Twenty decorative rubber stamps with ink pads.",
  },
  {
    id: "p79",
    title: "Natural Hoop Collection",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    price: 13.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 108,
    description: "Embroidery hoops in five bamboo sizes.",
  },
  {
    id: "p80",
    title: "Big Event Flyer Templates",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 11.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.6,
    downloads: "3.2K",
    description: "Seventy-five customizable flyer templates.",
  },
  {
    id: "p81",
    title: "Clean Hands Craft Gloves",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 9.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.7,
    stock: 132,
    description: "Disposable gloves for mess-free resin work.",
  },
  {
    id: "p82",
    title: "Bright Paper Bulk Pack",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    price: 16.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.6,
    stock: 143,
    description: "500 assorted construction paper sheets.",
  },
  {
    id: "p83",
    title: "Sweet Label Templates",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 8.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "5.7K",
    description: "200+ label templates for jars, bottles, and gifts.",
  },
  {
    id: "p84",
    title: "Smooth Binding Makers",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    price: 14.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 64,
    description: "Four bias tape makers for clean binding edges.",
  },
  {
    id: "p85",
    title: "Harvest Table Crafts",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    price: 10.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.9,
    downloads: "4.6K",
    description: "Forty Thanksgiving decoration and craft templates.",
  },
  {
    id: "p86",
    title: "Artist's Brush Collection",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 23.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.7,
    stock: 86,
    description: "Professional paint brushes for every medium.",
  },
  {
    id: "p87",
    title: "Pressed Pattern Folders",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 19.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.6,
    stock: 71,
    description: "Ten embossing folders with varied patterns.",
  },
  {
    id: "p88",
    title: "Stitch Machine Needle Pack",
    image: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80",
    price: 8.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 156,
    description: "Fifty sewing machine needles in assorted sizes.",
  },
  {
    id: "p89",
    title: "Pocket Brochure Designs",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 13.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.7,
    downloads: "2.9K",
    description: "Fifty tri-fold brochure templates.",
  },
  {
    id: "p90",
    title: "Crystal Clear Heat Gun",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 24.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.6,
    stock: 58,
    description: "Dual-temperature heat gun for bubble-free resin.",
  },
  {
    id: "p91",
    title: "Timber Craft Sticks",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    price: 11.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.7,
    stock: 174,
    description: "1,000 natural wood craft sticks in three sizes.",
  },
  {
    id: "p92",
    title: "Fresh Menu Designs",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 12.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "3.4K",
    description: "Forty restaurant menu templates.",
  },
  {
    id: "p93",
    title: "True Line Quilting Rulers",
    image: "https://images.unsplash.com/photo-1586339277861-b0b895343ba5?w=800&q=80",
    price: 21.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 67,
    description: "Acrylic quilting rulers in four essential sizes.",
  },
  {
    id: "p94",
    title: "Countdown Celebration Set",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    price: 9.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.6,
    downloads: "3.8K",
    description: "New Year's Eve printables for a sparkling celebration.",
  },
  {
    id: "p95",
    title: "Soft Sheen Wax Set",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 26.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.8,
    stock: 49,
    description: "Furniture wax for sealing and finishing painted pieces.",
  },
  {
    id: "p96",
    title: "Soft Corner Punch Tool",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 12.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.6,
    stock: 98,
    description: "Professional corner rounder for cards and photos.",
  },
  {
    id: "p97",
    title: "Charm Square Fabric Bundle",
    image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&q=80",
    price: 28.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 73,
    description: "Fifty coordinating cotton fabric squares.",
  },
  {
    id: "p98",
    title: "Golden Award Templates",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    price: 10.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.9,
    downloads: "4.2K",
    description: "Fifty customizable certificate and award templates.",
  },
  {
    id: "p99",
    title: "Clean Pour Silicone Mat",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 15.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.8,
    stock: 91,
    description: "Large non-stick silicone mat for resin projects.",
  },
  {
    id: "p100",
    title: "Bright Petal Tissue Pack",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    price: 13.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.6,
    stock: 162,
    description: "Rainbow assortment of tissue paper for crafts.",
  },
  {
    id: "p101",
    title: "Big Message Poster Designs",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 14.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.7,
    downloads: "3.1K",
    description: "Sixty eye-catching poster templates for events.",
  },
  {
    id: "p102",
    title: "True Fit Tape Measure",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    price: 6.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 187,
    description: "60-inch retractable measuring tape for sewing.",
  },
  {
    id: "p103",
    title: "Fresh Bloom Spring Crafts",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    price: 11.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.8,
    downloads: "4.3K",
    description: "Forty-five spring-themed craft projects and templates.",
  },
  {
    id: "p104",
    title: "Strong Hold Wood Glue",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 14.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.7,
    stock: 104,
    description: "Strong wood glue for furniture and craft projects.",
  },
  {
    id: "p105",
    title: "Ever Lasting Ink Pads",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 17.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.6,
    stock: 89,
    description: "Twelve archival ink pads for crisp, fade-proof stamping.",
  },
  {
    id: "p106",
    title: "Green Nest Plant Hanger Kit",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    price: 21.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 66,
    description: "Driftwood ring, 3mm cotton cord, and a printed guide for two plant hanger styles.",
  },
  {
    id: "p107",
    title: "Artisan Bloom Yarn Trio",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&q=80",
    price: 27.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.9,
    stock: 48,
    description: "Three artisanal hand-dyed skeins — no two exactly alike.",
  },
  {
    id: "p108",
    title: "Petal Press Coaster Kit",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 14.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.7,
    stock: 83,
    description: "Dried botanicals, silicone coaster molds, and UV resin for gift-worthy coasters.",
  },
  {
    id: "p109",
    title: "Bloom Brush Lettering Course",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    price: 19.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.9,
    downloads: "1.9K",
    description: "Video lessons and printable practice sheets for modern brush lettering.",
  },
  {
    id: "p110",
    title: "Petite Stitch Samplers",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    price: 18.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 74,
    description: "Three mini hoops with pre-printed fabrics and floss for quick wins.",
  },
  {
    id: "p111",
    title: "Heritage Keychain Craft Kit",
    image: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800&q=80",
    price: 16.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 59,
    description: "Pre-cut leather blanks, stamps, rivets, and hardware for custom keychains.",
  },
  {
    id: "p112",
    title: "Stitch & Gift Essentials Box",
    image: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80",
    price: 34.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.9,
    stock: 41,
    description: "Shears, seam ripper, needles, thread snips, and a tape measure in a keepsake box.",
  },
  {
    id: "p113",
    title: "Fluid Bloom Pouring Paints",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 25.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.7,
    stock: 70,
    description: "High-flow acrylics plus pouring medium for marbled canvas art.",
  },
  {
    id: "p114",
    title: "Four Seasons Wreath Kit",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    price: 39.99,
    category: "Seasonal Crafts",
    type: "physical",
    rating: 4.8,
    stock: 36,
    description: "Four seasonal wreath kits with frames, foliage, and ribbon bundles.",
  },
  {
    id: "p115",
    title: "Memory Garden Scrapbook Kit",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 12.99,
    category: "Paper Crafts",
    type: "digital",
    rating: 4.8,
    downloads: "2.2K",
    description: "Papers, elements, and alphas for digital scrapbooking and journaling.",
  },
  {
    id: "p116",
    title: "Weave & Bead Loom Kit",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    price: 23.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 52,
    description: "Adjustable wooden loom, seed beads, thread, and pattern charts.",
  },
  {
    id: "p117",
    title: "Flourish Pen Calligraphy Set",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    price: 24.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.8,
    stock: 61,
    description: "Oblique pen, nibs, ink, and practice pads for copperplate lettering.",
  },
  {
    id: "p118",
    title: "Little Bloom Craft Box",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    price: 29.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.9,
    stock: 44,
    description: "A surprise box of age-appropriate craft projects delivered monthly.",
  },
  {
    id: "p119",
    title: "Flower Press Craft Kit",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80",
    price: 24.99,
    category: "Seasonal Crafts",
    type: "physical",
    rating: 4.8,
    stock: 57,
    description: "A wooden press, blotting paper, and display frames for preserving garden blooms.",
  },
  {
    id: "p120",
    title: "Seed Paper Making Kit",
    image: "https://images.unsplash.com/photo-1469259943454-aa100abba749?w=800&q=80",
    price: 19.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.7,
    stock: 63,
    description: "Everything needed to blend, pour, and press plantable seed paper at home.",
  },
  {
    id: "p121",
    title: "Watercolor Garden Journal",
    image: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?w=800&q=80",
    price: 12.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "1.6K",
    description: "Printable watercolor pages and prompts for sketching your garden season by season.",
  },
  {
    id: "p122",
    title: "Terrarium Craft Kit",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    price: 34.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.9,
    stock: 39,
    description: "Glass vessel, soil, pebbles, moss, and two mini plants for a living centerpiece.",
  },
  {
    id: "p123",
    title: "Spring Wreath DIY Bundle",
    image: "https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=800&q=80",
    price: 27.99,
    category: "Seasonal Crafts",
    type: "physical",
    rating: 4.7,
    stock: 46,
    description: "Wire frames, faux blooms, and ribbon for a bright seasonal door wreath.",
  },
  {
    id: "p124",
    title: "Floral Pattern Design Pack",
    image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&q=80",
    price: 11.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "2.3K",
    description: "Seamless floral patterns and clip art for fabric, stationery, and web design.",
  },
  {
    id: "p125",
    title: "Garden Journaling Kit",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 22.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.6,
    stock: 51,
    description: "A linen journal, botanical stickers, washi tapes, and pens for memory keeping.",
  },
  {
    id: "p126",
    title: "Paper Quilling Flower Kit",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 16.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.8,
    stock: 68,
    description: "Pre-cut quilling strips, tools, and templates for rolled paper blooms.",
  },
  {
    id: "p127",
    title: "Macramé Plant Hanger Duo",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    price: 18.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.7,
    stock: 72,
    description: "Natural cotton cord and rings to knot two hanging plant displays.",
  },
  {
    id: "p128",
    title: "Botanical Watercolor Kit",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    price: 31.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.8,
    stock: 55,
    description: "Professional watercolors, brushes, and paper for painting florals and foliage.",
  },
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productType, setProductType] = useState<"all" | "physical" | "digital">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const { toast } = useToast();

  // Checkout form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cashapp">("card");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesType = productType === "all" || product.type === productType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast({
      title: "Added to cart! 🛒",
      description: `${product.title} has been added to your cart.`,
    });
    setSelectedProduct(null);
    setCartOpen(true); // Open cart sidebar automatically
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setCartOpen(true);
    setCheckoutStep("cart");
  };

  const proceedToShipping = () => {
    setCheckoutStep("shipping");
  };

  const proceedToPayment = () => {
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setCheckoutStep("payment");
  };

  const completeOrder = () => {
    if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiry || !paymentInfo.cvv) {
      toast({
        title: "Missing payment information",
        description: "Please fill in all payment details",
        variant: "destructive",
      });
      return;
    }
    
    // Generate fake order number
    const orderNum = `CB-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    setOrderNumber(orderNum);
    setCheckoutStep("confirmation");
    
    // Clear cart after a delay
    setTimeout(() => {
      setCart([]);
    }, 2000);
  };

  const resetCheckout = () => {
    setCheckoutStep("cart");
    setCartOpen(false);
    setShippingInfo({
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
    });
    setPaymentInfo({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/10">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse the Craft Garden</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Discover craft supplies, digital patterns, and handmade treasures from our talented maker community
              </p>
            </div>
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button size="lg" className="hidden md:flex items-center gap-2 relative">
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                {checkoutStep === "cart" && (
                  <>
                    <SheetHeader>
                      <SheetTitle>Shopping Cart ({cartCount} items)</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8 space-y-4">
                      {cart.length === 0 ? (
                        <div className="text-center py-12">
                          <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">Your cart is empty</p>
                        </div>
                      ) : (
                        <>
                          {cart.map((item) => (
                            <Card key={item.product.id} className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={item.product.image}
                                  alt={item.product.title}
                                  className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold line-clamp-2">{item.product.title}</h4>
                                  <p className="text-sm text-muted-foreground">${item.product.price}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    >
                                      -
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    >
                                      +
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => removeFromCart(item.product.id)}
                                      className="ml-auto"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                          <Separator />
                          <div className="space-y-2">
                            <div className="flex justify-between text-lg font-semibold">
                              <span>Total:</span>
                              <span>${cartTotal.toFixed(2)}</span>
                            </div>
                          </div>
                          <Button onClick={proceedToShipping} className="w-full" size="lg">
                            Proceed to Checkout
                          </Button>
                        </>
                      )}
                    </div>
                  </>
                )}

                {checkoutStep === "shipping" && (
                  <>
                    <SheetHeader>
                      <SheetTitle>Shipping Information</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8 space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input
                            id="zip"
                            value={shippingInfo.zip}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Select value={shippingInfo.country} onValueChange={(v) => setShippingInfo({ ...shippingInfo, country: v })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" onClick={() => setCheckoutStep("cart")} className="flex-1">
                          Back
                        </Button>
                        <Button onClick={proceedToPayment} className="flex-1">
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {checkoutStep === "payment" && (
                  <>
                    <SheetHeader>
                      <SheetTitle>Payment Information</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8 space-y-4">
                      <div className="bg-secondary/20 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span>Subtotal:</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Shipping:</span>
                          <span>$5.99</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>${(cartTotal + 5.99).toFixed(2)}</span>
                        </div>
                      </div>

                      <div>
                        <Label>Payment Method</Label>
                        <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)} className="mt-2">
                          <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-secondary/20">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                              <CreditCard className="w-5 h-5" />
                              <span>Credit/Debit Card</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-secondary/20">
                            <RadioGroupItem value="cashapp" id="cashapp" />
                            <Label htmlFor="cashapp" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Smartphone className="w-5 h-5" />
                              <span>Cash App</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "card" && (
                        <>
                          <div>
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardName">Cardholder Name *</Label>
                            <Input
                              id="cardName"
                              value={paymentInfo.cardName}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date *</Label>
                              <Input
                                id="expiry"
                                value={paymentInfo.expiry}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {paymentMethod === "cashapp" && (
                        <Card className="p-6 bg-green-50 border-green-200">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                <Smartphone className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold">Pay with Cash App</h4>
                                <p className="text-sm text-muted-foreground">Send payment to complete order</p>
                              </div>
                            </div>
                            <Separator />
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-semibold mb-1">Cash App Tag:</p>
                                <div className="bg-white p-3 rounded border border-green-300 font-mono text-lg">
                                  $BRIGHTBLOOMLLC
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-semibold mb-1">Amount to Send:</p>
                                <div className="bg-white p-3 rounded border border-green-300 font-mono text-lg font-bold text-green-600">
                                  ${(cartTotal + 5.99).toFixed(2)}
                                </div>
                              </div>
                              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                                <p className="text-sm font-semibold mb-2">📱 Instructions:</p>
                                <ol className="text-sm space-y-1 list-decimal list-inside">
                                  <li>Open Cash App on your phone</li>
                                  <li>Tap "Pay" and search for <strong>$BRIGHTBLOOMLLC</strong></li>
                                  <li>Enter amount: <strong>${(cartTotal + 5.99).toFixed(2)}</strong></li>
                                  <li>Add note: "Order {orderNumber || 'CB-XXXXXX'}"</li>
                                  <li>Complete payment and click "Place Order" below</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )}

                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" onClick={() => setCheckoutStep("shipping")} className="flex-1">
                          Back
                        </Button>
                        <Button onClick={completeOrder} className="flex-1">
                          {paymentMethod === "card" ? (
                            <>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Place Order
                            </>
                          ) : (
                            <>
                              <Smartphone className="w-4 h-4 mr-2" />
                              Confirm Payment
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {checkoutStep === "confirmation" && (
                  <>
                    <SheetHeader>
                      <SheetTitle>Order Confirmed!</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8 text-center space-y-6">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                        <p className="text-muted-foreground">Your order has been successfully placed</p>
                      </div>
                      <Card className="p-6 text-left">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Order Number:</span>
                            <span className="font-semibold">{orderNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total:</span>
                            <span className="font-semibold">${(cartTotal + 5.99).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-semibold">{shippingInfo.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment:</span>
                            <span className="font-semibold">{paymentMethod === "card" ? "Credit Card" : "Cash App"}</span>
                          </div>
                        </div>
                      </Card>
                      
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Download className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">Digital Products & Order Details</h4>
                            <p className="text-sm text-muted-foreground">
                              Your order confirmation and digital downloads will be sent to <strong>{shippingInfo.email}</strong> within 5 minutes.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Physical items will be shipped to your address within 3-5 business days.
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Check your email for order confirmation and download links
                      </p>
                      <Button onClick={resetCheckout} className="w-full">
                        Continue Shopping
                      </Button>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Product Type Tabs */}
        <Tabs value={productType} onValueChange={(v) => setProductType(v as any)} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="physical">
              <Package className="w-4 h-4 mr-2" />
              Physical
            </TabsTrigger>
            <TabsTrigger value="digital">
              <FileText className="w-4 h-4 mr-2" />
              Digital
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button className="md:hidden flex items-center gap-2 relative">
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </Card>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90"
                />
                <Badge className="absolute top-3 right-3 bg-white text-foreground">
                  ${product.price}
                </Badge>
                <Badge className="absolute top-3 left-3" variant={product.type === "digital" ? "secondary" : "default"}>
                  {product.type === "digital" ? <Download className="w-3 h-3 mr-1" /> : <Package className="w-3 h-3 mr-1" />}
                  {product.type === "digital" ? "Digital" : "Physical"}
                </Badge>
              </div>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2 text-xs">
                  {product.category}
                </Badge>
                <h3 className="font-bold text-lg line-clamp-2">{product.title}</h3>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                {product.type === "digital" && product.downloads && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{product.downloads}</span>
                  </div>
                )}
                {product.type === "physical" && product.stock && (
                  <div className="text-sm text-muted-foreground">
                    {product.stock} in stock
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.title}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 py-4">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedProduct.rating}</span>
                      <span className="text-muted-foreground text-sm">rating</span>
                    </div>
                    {selectedProduct.type === "digital" && selectedProduct.downloads && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Download className="w-5 h-5" />
                        <span>{selectedProduct.downloads} downloads</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline">{selectedProduct.category}</Badge>
                    <Badge variant={selectedProduct.type === "digital" ? "secondary" : "default"}>
                      {selectedProduct.type === "digital" ? "Digital Download" : "Physical Product"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">{selectedProduct.description}</p>
                  <div className="bg-secondary/20 p-4 rounded-lg mb-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${selectedProduct.price}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedProduct.type === "digital" 
                        ? "Instant digital download • Lifetime access"
                        : `${selectedProduct.stock} in stock • Fast shipping`
                      }
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                  Close
                </Button>
                <Button onClick={() => addToCart(selectedProduct)} className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
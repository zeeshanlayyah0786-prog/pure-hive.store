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
    title: "Floral Embroidery Library",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    price: 12.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.8,
    downloads: "2.5K",
    description: "Over 50 hand-drawn floral, animal, and geometric motifs with PDF templates, stitch guides, and color palettes.",
  },
  {
    id: "p2",
    title: "Blooming Paper Flowers Vol. 1",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
    price: 9.99,
    category: "Paper Crafts",
    type: "digital",
    rating: 4.9,
    downloads: "3.2K",
    description: "Thirty lifelike flower templates — roses, peonies, and daisies — with step-by-step assembly photos.",
  },
  {
    id: "p3",
    title: "First Pour: Resin Jewelry Kit",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    price: 34.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.7,
    stock: 45,
    description: "Everything a beginner needs: molds, crystal-clear resin, pigments, and tools, plus a printed guide to your first pair of earrings.",
  },
  {
    id: "p4",
    title: "Macramé Cord Palette (5 Colors)",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    price: 24.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 120,
    description: "Five farmhouse shades of 3mm cotton cord, 100 yards per spool — ideal for wall hangings and plant hangers.",
  },
  {
    id: "p5",
    title: "Amigurumi Menagerie Pattern Book",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    price: 15.99,
    category: "Sewing & Crochet",
    type: "digital",
    rating: 4.9,
    downloads: "4.1K",
    description: "Twenty-five whimsical animals and characters with stitch diagrams and assembly notes.",
  },
  {
    id: "p6",
    title: "48-Pan Watercolor Studio",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 29.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 78,
    description: "A studio-grade palette of 48 vibrant pans with travel brushes and a mixing tray.",
  },
  {
    id: "p7",
    title: "Year of Crafting Planner",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    price: 8.99,
    category: "Seasonal Crafts",
    type: "digital",
    rating: 4.5,
    downloads: "2.8K",
    description: "A month-by-month craft planner with seasonal themes, supply lists, and project instructions.",
  },
  {
    id: "p8",
    title: "Little Makers Activity Treasury",
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
    title: "Clay Sculptor's Essential Tools",
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80",
    price: 18.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.6,
    stock: 92,
    description: "Fifteen precision tools for shaping, texturing, and detailing polymer clay.",
  },
  {
    id: "p10",
    title: "Origami Spectrum (500 Sheets)",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    price: 14.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.8,
    stock: 156,
    description: "Five hundred crisp sheets in fifty colors and patterns — folds cleanly every time.",
  },
  {
    id: "p11",
    title: "Cozy Knits Pattern Vault",
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
    title: "Artist's Acrylics (24 Colors)",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 22.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.5,
    stock: 88,
    description: "Richly pigmented acrylics for canvas, wood, and mixed-media pieces.",
  },
  {
    id: "p13",
    title: "Storybook Sticker Library",
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
    title: "Silicone Mold Assortment (20pc)",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 16.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.7,
    stock: 67,
    description: "Jewelry, coaster, and keychain molds that release cleanly every pour.",
  },
  {
    id: "p15",
    title: "Cross Stitch Classics Collection",
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
    title: "Felt Sheet Rainbow (50 Pack)",
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
    title: "Modern Calligraphy Workbook",
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
    title: "Beader's Treasure Box",
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
    title: "Season's Greetings Card Studio",
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
    title: "Pyrography Pro Pen Kit",
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
    title: "Quilling Rainbow Strips (1,000)",
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
    title: "Wardrobe Maker's Patterns",
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
    title: "Sparkle Squad Glitter Glue",
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
    title: "Liquid Color: Resin Pigments",
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
    title: "Plan in Style Sticker Sheets",
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
    title: "Textile Artist Paints (18 Colors)",
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
    title: "Wreath Studio Starter Box",
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
    title: "Coloring Wonderland (100 Pages)",
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
    title: "Leathersmith's Tool Bench",
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
    title: "Cardstock Palette (250 Sheets)",
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
    title: "Ergonomic Hook Family (14 Sizes)",
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
    title: "Cut File Vault (500+ SVGs)",
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
    title: "Crystal Clear Epoxy (32 oz)",
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
    title: "Fluffy Pom Factory",
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
    title: "Watercolor Botanicals",
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
    title: "First Felts Starter Kit",
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
    title: "Merry Ornament Studio",
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
    title: "Decoupage Finishing Pack",
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
    title: "Shape Punches (12 Designs)",
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
    title: "Quilt Block Library",
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
    title: "Furniture Chalk Paints",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 27.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.5,
    stock: 62,
    description: "Matte-finish chalk paint for furniture upcycling.",
  },
  {
    id: "p42",
    title: "Glitter Storm for Resin",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 12.99,
    category: "Resin Art",
    type: "physical",
    rating: 4.8,
    stock: 94,
    description: "Fine glitter mix in twenty colors made for resin pours.",
  },
  {
    id: "p43",
    title: "Party in a PDF",
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
    title: "Washi Wonder Rolls",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    price: 18.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.7,
    stock: 136,
    description: "Twenty-four decorative washi tape rolls in patterns and colors.",
  },
  {
    id: "p45",
    title: "Floss Organizer: 100 Colors",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    price: 21.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.8,
    stock: 87,
    description: "One hundred embroidery floss colors in a boxed organizer.",
  },
  {
    id: "p46",
    title: "Gallery Wall Printables",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    price: 11.99,
    category: "Digital Templates",
    type: "digital",
    rating: 4.6,
    downloads: "3.9K",
    description: "Fifty modern art prints ready to frame.",
  },
  {
    id: "p47",
    title: "Quick-Bond Glue Station",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    price: 13.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.5,
    stock: 118,
    description: "High-temp glue gun with fifty glue sticks included.",
  },
  {
    id: "p48",
    title: "Jewelry Findings Grab Bag",
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
    title: "Hoppy Easter Crafts",
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
    title: "Pro Cutting Mat 24×36",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    price: 19.99,
    category: "Paper Crafts",
    type: "physical",
    rating: 4.9,
    stock: 84,
    description: "Self-healing cutting mat with printed grid lines.",
  },
  {
    id: "p51",
    title: "Skein Rainbow (20 Skeins)",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    price: 32.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 69,
    description: "Twenty soft acrylic skeins in assorted colors.",
  },
  {
    id: "p52",
    title: "I Do: Invitation Suite",
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
    title: "Stencil Library (30 Designs)",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    price: 16.99,
    category: "Home Decor DIY",
    type: "physical",
    rating: 4.6,
    stock: 91,
    description: "Reusable stencils for painting and home decor.",
  },
  {
    id: "p54",
    title: "UV Quick Cure Resin",
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
    title: "Foam Sheet Stack (40)",
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
    title: "Bullet Journal Toolkit",
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
    title: "Precision Rotary Cutter",
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
    title: "Autumn Wreath Blueprints",
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
    title: "Aerosol Art Pack (12 Colors)",
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
    title: "Die-Cut Essentials Kit",
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
    title: "Bamboo Needle Collection",
    image: "https://images.unsplash.com/photo-1586339277861-b0b895343ba5?w=800&q=80",
    price: 26.99,
    category: "Sewing & Crochet",
    type: "physical",
    rating: 4.7,
    stock: 68,
    description: "Bamboo knitting needles in ten sizes with case.",
  },
  {
    id: "p62",
    title: "Brand Mark Template Pack",
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
    title: "Alcohol Ink Alchemy",
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
    title: "Chenille Stem Bonanza",
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
    title: "Content Creator's Kit",
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
    title: "Dressmaker's Shears",
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
    title: "Hearts & Crafts Collection",
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
    title: "Timber Tones Wood Stain",
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
    title: "Patterned Paper Pantry",
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
    title: "Tapestry Yarn Spectrum",
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
    title: "First Impression Cards",
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
    title: "Pour Station Mixing Cups",
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
    title: "Wiggle Eye Megapack",
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
    title: "Recipe Keepsake Cards",
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
    title: "Stitch Undo Trio",
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
    title: "Spooky Season Studio",
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
    title: "Sanding Grit Assortment",
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
    title: "Vintage Stamp Collection",
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
    title: "Bamboo Hoop Quintet",
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
    title: "Event Flyer Factory",
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
    title: "Nitrile Craft Gloves",
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
    title: "Construction Paper Bulk Box",
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
    title: "Label It! Template Pack",
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
    title: "Bias Tape Makers (4 Sizes)",
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
    title: "Grateful Gatherings Crafts",
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
    title: "Brush Arsenal (24 Pieces)",
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
    title: "Embossing Texture Pack",
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
    title: "Machine Needle Assortment",
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
    title: "Tri-Fold Brochure Studio",
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
    title: "Bubble-Buster Heat Gun",
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
    title: "Craft Stick Trove",
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
    title: "Menu Makeover Templates",
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
    title: "Quilter's Ruler Quartet",
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
    title: "Midnight Countdown Party Pack",
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
    title: "Finishing Wax Trio",
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
    title: "Perfect Corner Punch",
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
    title: "Patchwork Charm Squares",
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
    title: "Award & Certificate Studio",
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
    title: "Pour Pad Silicone Mat",
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
    title: "Tissue Rainbow (100 Sheets)",
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
    title: "Poster Power Templates",
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
    title: "Tailor's Tape Measure",
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
    title: "Spring Fever Craft Collection",
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
    title: "Bond & Build Wood Glue",
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
    title: "Archival Ink Rainbow",
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
    title: "Boho Macramé Plant Hanger Kit",
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
    title: "Hand-Dyed Yarn Trio",
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
    title: "Pressed Flower Resin Coaster Kit",
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
    title: "Watercolor Brush Lettering Course",
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
    title: "Mini Embroidery Samplers (Set of 3)",
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
    title: "Leather Keychain Making Kit",
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
    title: "Sewing Essentials Gift Box",
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
    title: "Acrylic Pouring Paint Pack",
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
    title: "Wreath Kits by Season (Set of 4)",
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
    title: "Digital Scrapbook Mega Bundle",
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
    title: "Beading Loom Starter Kit",
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
    title: "Calligraphy Starter Set",
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
    title: "Kids Craft Subscription Box",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    price: 29.99,
    category: "Kids Crafts",
    type: "physical",
    rating: 4.9,
    stock: 44,
    description: "A surprise box of age-appropriate craft projects delivered monthly.",
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Things Craft</h1>
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
                                  $PUREHIVELLC
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
                                  <li>Tap "Pay" and search for <strong>$PUREHIVELLC</strong></li>
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
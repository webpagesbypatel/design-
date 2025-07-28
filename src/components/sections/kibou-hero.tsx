"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Shape, ExtrudeGeometry, Group } from 'three';
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';

// 3D Box Component
const Box = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
    const shape = new Shape();
    const angleStep = Math.PI * 0.5;
    const radius = 1;

    shape.absarc(2, 2, radius, angleStep * 0, angleStep * 1);
    shape.absarc(-2, 2, radius, angleStep * 1, angleStep * 2);
    shape.absarc(-2, -2, radius, angleStep * 2, angleStep * 3);
    shape.absarc(2, -2, radius, angleStep * 3, angleStep * 4);

    const extrudeSettings = {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 20,
        curveSegments: 20
    };

    const geometry = new ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    return (
        <mesh
            geometry={geometry}
            position={position}
            rotation={rotation}
        >
            <meshPhysicalMaterial 
                color="#232323"
                metalness={1}
                roughness={0.3}
                reflectivity={0.5}
                ior={1.5}
                emissive="#000000"
                emissiveIntensity={0}
                transparent={false}
                opacity={1.0}
                transmission={0.0}
                thickness={0.5}
                clearcoat={0.0}
                clearcoatRoughness={0.0}
                sheen={0}
                sheenRoughness={1.0}
                sheenColor="#ffffff"
                specularIntensity={1.0}
                specularColor="#ffffff"
                iridescence={1}
                iridescenceIOR={1.3}
                iridescenceThicknessRange={[100, 400]}
                flatShading={false}
                depthWrite={true}
                depthTest={true}
            />
        </mesh>
    );
};

// Animated Group of Boxes
const AnimatedBoxes = () => {
    const groupRef = useRef<Group>(null!);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.05;
        }
    });

    const boxes = Array.from({ length: 50 }, (_, index) => ({
        position: [(index - 25) * 0.75, 0, 0] as [number, number, number],
        rotation: [ (index - 10) * 0.1, Math.PI / 2, 0] as [number, number, number],
        id: index
    }));

    return (
        <group ref={groupRef}>
            {boxes.map((box) => (
                <Box
                    key={box.id}
                    position={box.position}
                    rotation={box.rotation}
                />
            ))}
        </group>
    );
};

// 3D Scene Component
const Scene = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [5, 5, 20], fov: 40 }}>
                <ambientLight intensity={15} />
                <directionalLight position={[10, 10, 5]} intensity={15} />
                <AnimatedBoxes />
            </Canvas>
        </div>
    );
};


// Header Component
const navLinks = ["Work", "Services", "Process", "Contact"];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return(
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-kibou"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4 glass-card rounded-full shadow-lg max-w-6xl mt-4">
          <a href="#home" className="text-2xl font-bold font-headline tracking-tighter">
            Kibou Systems
            <span className="text-kibou-violet">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="group relative text-sm font-medium text-foreground hover:text-foreground/80 transition-colors duration-300"
              >
                {link}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-gradient-to-r from-kibou-indigo to-kibou-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button variant="outline" className="rounded-full border-white/50">Get Free Consultation</Button>
          </div>
          <button onClick={toggleMenu} className="md:hidden text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
       {/* Mobile Menu */}
       <div className={cn(
        "fixed inset-0 z-50 bg-background/95 backdrop-blur-lg transition-transform duration-500 ease-kibou md:hidden",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-end p-6">
            <button onClick={toggleMenu} className="text-foreground">
                <X className="h-7 w-7"/>
            </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full -mt-16 gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={toggleMenu}
                className="text-2xl font-bold text-foreground hover:text-gradient transition-colors duration-300"
              >
                {link}
              </a>
            ))}
            <CtaButton asChild className="mt-8 text-xl px-10 py-4">
                <a href="#contact" onClick={toggleMenu}>Get Free Consultation</a>
            </CtaButton>
        </nav>
      </div>
    </>
    )
}

// Main Hero Component
export default function KibouHero() {
  return (
    <section className="relative w-full h-screen bg-linear-to-br from-[#000] to-[#1A2428] text-white overflow-hidden">
      <Scene />
      <Header />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tight max-w-4xl">
          Digital Experiences that Drive Growth.
        </h1>
        <p className="mt-6 text-lg text-neutral-300 max-w-2xl">
          We help ambitious businesses like yours grow with a beautiful digital presence, cutting-edge tech, and flawless development.
        </p>
        <div className="mt-8">
          <Button size="lg" className="bg-white text-black rounded-full text-base font-semibold hover:bg-neutral-200">
            Get Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}

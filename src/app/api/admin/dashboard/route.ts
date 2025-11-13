// src/app/api/admin/dashboard/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get total donations
    const totalDonations = await prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "SUCCESS",
      },
    });

    // Get monthly donations (current month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyDonations = await prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "SUCCESS",
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Get total branches
    const totalBranches = await prisma.branch.count();

    // Get total projects
    const totalProjects = await prisma.project.count();

    // Get recent activities (last 10 donations and created projects/events)
    const recentDonations = await prisma.donation.findMany({
      where: {
        status: "SUCCESS",
      },
      include: {
        branch: {
          select: { name: true },
        },
        project: {
          select: { title: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const recentProjects = await prisma.project.findMany({
      include: {
        branch: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    // Format recent activities
    const recentActivities = [
      ...recentDonations.map(donation => ({
        action: "New donation received",
        user: donation.donorName || donation.donorEmail || "Anonymous",
        time: formatTimeAgo(donation.createdAt),
        amount: `₦${donation.amount.toLocaleString()}`,
        branch: donation.branch?.name,
      })),
      ...recentProjects.map(project => ({
        action: "Project created",
        user: "System", // You might want to track who created projects
        time: formatTimeAgo(project.createdAt),
        project: project.title,
        branch: project.branch?.name,
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
     .slice(0, 8);

    return NextResponse.json({
      totalDonations: totalDonations._sum.amount || 0,
      monthlyDonations: monthlyDonations._sum.amount || 0,
      totalBranches,
      totalProjects,
      recentActivities,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}
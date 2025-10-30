"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Slot, User } from "../types";
import {
  getAvailableSlots,
  bookSlot,
  leaveSlot,
} from "../services/slotService";

import BookConfirmationDialog from "../components/BookConfirmationDialog";
import LeaveSlotConfirmationDialog from "../components/LeaveSlotConfirmationDialog";
import MemberInfoDialog from "../components/MemberInfoDialog";

const DATES = ["2025-10-31", "2025-11-01", "2025-11-02"];

interface TimeSlotCardProps {
  slot: Slot;
  user: User;
  teamHasBookedSlot: boolean;
  onBook: (slot: Slot) => void;
  onLeave: (slot: Slot) => void;
  onInfo: () => void;
}

const TimeSlotCard = ({
  slot,
  user,
  teamHasBookedSlot,
  onBook,
  onLeave,
  onInfo,
}: TimeSlotCardProps) => {
  const { is_leader, team } = user;

  const isLeaderOnOwnSlot = is_leader && slot.booked_by === team?.id;

  let label: string;
  let action: () => void;
  let style: string;

  if (slot.booked_by === team?.id) {
    label = "Your Slot";
    action = () => onInfo();
    style = "bg-green-600 text-white cursor-not-allowed";
  } else if (slot.booked_by !== null) {
    label = "Slot Full";
    action = () => {};
    style = "bg-gray-300 text-gray-500 cursor-not-allowed";
  } else if (teamHasBookedSlot) {
    label = "Team Has Slot";
    action = () => {};
    style = "bg-gray-300 text-gray-500 cursor-not-allowed";
  } else if (!is_leader) {
    label = "Leader Only";
    action = onInfo;
    style = "bg-gray-400 text-white cursor-pointer";
  } else {
    label = "Book Slot";
    action = () => onBook(slot);
    style = "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer";
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
      <p className="text-lg font-semibold">
        {new Date(slot.start_time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}{" "}
        -{" "}
        {new Date(slot.end_time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </p>
      <p className="mb-4 text-sm text-gray-500">
        {new Date(slot.start_time).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </p>

      {isLeaderOnOwnSlot ? (
        <button
          onClick={() => onLeave(slot)}
          className="group w-full cursor-pointer rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
        >
          <span className="block group-hover:hidden">Your Slot</span>
          <span className="hidden group-hover:block">Leave Slot</span>
        </button>
      ) : (
        <button
          onClick={action}
          className={`w-full rounded-md px-4 py-2 font-semibold transition-colors ${style}`}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default function BookSlotPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [slots, setSlots] = useState<Slot[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(DATES[0]);

  const [bookingSlot, setBookingSlot] = useState<Slot | null>(null);
  const [leavingSlot, setLeavingSlot] = useState<Slot | null>(null);
  const [showMemberInfo, setShowMemberInfo] = useState(false);

  const fetchSlots = useCallback(async () => {
    setIsFetchingSlots(true);
    try {
      const availableSlots = await getAvailableSlots();
      setSlots(availableSlots);
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    } finally {
      setIsFetchingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!user?.team) {
        alert("You must be in a team to book a slot.");
        router.push("/dashboard");
      } else {
        fetchSlots();
      }
    }
  }, [user, isAuthLoading, router, fetchSlots]);

  const teamBookedSlot = useMemo(
    () => slots.find((s) => s.booked_by === user?.team?.id),
    [slots, user]
  );

  const handleConfirmBooking = async () => {
    if (!bookingSlot) return;
    try {
      await bookSlot(bookingSlot.id);
      await fetchSlots();
    } catch (error) {
      alert("Failed to book slot.");
    } finally {
      setBookingSlot(null);
    }
  };

  const handleConfirmLeave = async () => {
    if (!leavingSlot) return;
    try {
      await leaveSlot(leavingSlot.id);
      await fetchSlots();
    } catch (error) {
      alert("Failed to leave slot.");
    } finally {
      setLeavingSlot(null);
    }
  };

  if (isAuthLoading || !user?.team) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const filteredSlots = slots.filter((s) =>
    new Date(s.start_time).toISOString().startsWith(selectedDate)
  );

  return (
    <>
      <div className="flex flex-grow flex-col items-center p-4">
        <h1 className="mb-4 text-4xl font-bold">Book a Time Slot</h1>
        <p className="mb-8 text-gray-600">
          Select a date to view available slots.
        </p>

        <div className="mb-8 flex rounded-lg border border-gray-300 bg-white p-1 shadow-sm">
          {DATES.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`rounded-md px-6 py-2 text-sm font-semibold transition-colors ${
                selectedDate === date
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                timeZone: "UTC",
              })}
            </button>
          ))}
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {isFetchingSlots ? (
            <p className="col-span-3 text-center text-gray-500">
              Loading slots...
            </p>
          ) : filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <TimeSlotCard
                key={slot.id}
                slot={slot}
                user={user}
                teamHasBookedSlot={!!teamBookedSlot}
                onBook={setBookingSlot}
                onLeave={setLeavingSlot}
                onInfo={() => setShowMemberInfo(true)}
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No slots available for this date.
            </p>
          )}
        </div>
      </div>

      {bookingSlot && (
        <BookConfirmationDialog
          open={!!bookingSlot}
          onClose={() => setBookingSlot(null)}
          slotTime={`${new Date(bookingSlot.start_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
          onConfirm={handleConfirmBooking}
        />
      )}
      {leavingSlot && (
        <LeaveSlotConfirmationDialog
          open={!!leavingSlot}
          onClose={() => setLeavingSlot(null)}
          onConfirm={handleConfirmLeave}
        />
      )}
      <MemberInfoDialog
        open={showMemberInfo}
        onClose={() => setShowMemberInfo(false)}
      />
    </>
  );
}

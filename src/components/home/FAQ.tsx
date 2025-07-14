import AccordionItem from "./AccordionItem";

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto p-6 sm:px-16 px-3">
      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="mt-5 w-full mx-auto flex flex-col justify-start items-start">
          <AccordionItem headerTitle="What are your business hours?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              Our business hours are from 9 AM to 6 PM, Monday through Sunday. 
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="Do I get a refund if I missed a tour?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              We do not issue refunds for missed tours. The refund policy covers all possible scenarios in which guests are eligible for refunds. Kindly consult our refund policy for all categories of refunds <a href="/refund-policy">HERE</a>.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="How can I beat the waiting time?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              Booking prepaid tickets for your visit allows you to skip the line.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="Do you provide the tickets in advance?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              We offer a prepaid ticket (subject to your availability) which allows you to skip the line. If you booked a prepaid ticket tour with us, we will send you your ticket within 24 hours before your tour time.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="Do I need to present my booking ref at the meeting point to the tour guide before getting my tickets?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              You are required to present your voucher containing your booking reference to the coordinator at the meeting point in order to be checked in for the tour.
            </p>
          </AccordionItem>
        </div>
        <div className="mt-5 w-full mx-auto flex flex-col justify-start items-start">
          <AccordionItem headerTitle="Can I cancel a ticket from a booking?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              Cancellation cannot be made to just one ticket from a booking. However, you can make amendments to your previous booking. To make amendments, you need to contact the travel agency where you booked with us.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="How soon is my refund processed? Do I get a refund when I cancel a booking?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              First, you need to check our refund policy for the product you booked to be sure you qualify for a refund. If you qualify, then note that refunds are issued by the Online Travel Agency (OTA) platform where you made your booking in the first place. All refunds issues or questions must be addressed to the OTA platform.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="Can I move my tour time to a different time?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              In general, the answer is NO because we make preparations for your visit ahead, and such preparations may involve prior reservations and pre-bookings with other entities. However, in very few cases, we are able to make an exception. Please direct inquiries pertaining to changes of time to <a href="mailto:tltraveltours@gmail.com">tltraveltours@gmail.com</a>.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="Do I need to redeem my tickets before the tour starts?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              Yes. We send prepaid tickets by the morning of the tour day. If you have not received your prepaid tickets within 12 hours before the tour, call us or email us to rectify the situation.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="Are refunds processed to the same card with which payment was made?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              Refunds are issued by the Online Travel Agency platform where you made your booking in the first place. All refunds issues or questions must be addressed to the OTA platform. If you booked with us via our website, then you will receive your refund to the same card with which payment was made.
            </p>
          </AccordionItem>
        </div>
        <div className="mt-5 w-full mx-auto flex flex-col justify-start items-start">
          <AccordionItem headerTitle="How do I confirm that a refund has been made?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              Once a refund is made, a confirmation mail will be sent to you by the online platform where your booking was made in the first place. If you booked with us directly through our website, we will send you a confirmation email upon processing your refund.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="Will my USD get converted when I make a purchase?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              All our transactions are made in Euros. You may need to check with your bank or the OTA on how your payment is processed.
            </p>
          </AccordionItem>
          <AccordionItem headerTitle="Do you send the tickets electronically?">
            <p className="text-gray-600 text-base outline-none leading-7 gap-2">
              We send tickets electronically. Also, guests who wish to meet up at the meeting point can make a special request by email or by telephone call to pick up their tickets at the meeting point.
            </p>
          </AccordionItem>
        </div>
      </div>
    </div>
    </section>
  );
}

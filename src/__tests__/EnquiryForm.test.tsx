import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EnquiryForm from "@/components/EnquiryForm";

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("EnquiryForm", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <EnquiryForm isOpen={false} onClose={jest.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders form fields when open", () => {
    render(<EnquiryForm isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit enquiry/i })).toBeInTheDocument();
  });

  it("shows package name in title when provided", () => {
    render(
      <EnquiryForm
        isOpen={true}
        onClose={jest.fn()}
        packageName="China Highlights Tour"
      />,
    );
    expect(
      screen.getByRole("heading", { name: /enquire.*china highlights tour/i }),
    ).toBeInTheDocument();
  });

  it("pre-fills message with package name", () => {
    render(
      <EnquiryForm
        isOpen={true}
        onClose={jest.fn()}
        packageName="Test Package"
      />,
    );
    const messageField = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
    expect(messageField.value).toContain("Test Package");
  });

  it("submits form successfully", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<EnquiryForm isOpen={true} onClose={jest.fn()} />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.click(screen.getByRole("button", { name: /submit enquiry/i }));

    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/enquire",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("John Doe"),
      }),
    );
  });

  it("shows error message on submission failure", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<EnquiryForm isOpen={true} onClose={jest.fn()} />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.click(screen.getByRole("button", { name: /submit enquiry/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(<EnquiryForm isOpen={true} onClose={onClose} />);

    await user.click(screen.getByLabelText(/close/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

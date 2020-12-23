import App from "@/App.vue";
import { render, fireEvent } from "@testing-library/vue";

const mockData = {
  base: "EUR",
  date: "2020-12-22",
  rates: {
    USD: 1.3,
    CAD: 1.5
  }
};

jest.mock("axios", () => ({
  get: jest.fn(() => ({
    data: mockData
  }))
}));

describe("Main app tests", () => {
  it("renders all input fields", () => {
    const { getByRole } = render(App);
    expect(
      getByRole("spinbutton", { name: /source amount:/i })
    ).toBeInTheDocument();
    expect(
      getByRole("spinbutton", { name: /target amount:/i })
    ).toBeInTheDocument();
  });

  it("shows the calculated USD value", async () => {
    const { getByRole } = render(App);
    const input = getByRole("spinbutton", { name: /source amount:/i });
    const output = getByRole("spinbutton", { name: /target amount:/i });

    await fireEvent.update(input, 10);

    expect(output).toHaveValue(13);
  });

  it("shows the calculated CAD value", async () => {
    const screen = render(App);
    const input = screen.getByRole("spinbutton", { name: /source amount:/i });
    const output = screen.getByRole("spinbutton", { name: /target amount:/i });
    const [, target] = screen.getAllByRole("combobox");

    await fireEvent.update(input, 10);
    await fireEvent.update(target, "CAD");

    expect(output).toHaveValue(15);
  });
});

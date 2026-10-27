import { jsx as _jsx } from "react/jsx-runtime";
import { TripPlanner } from '../components/TripPlanner';
export function PlanPage() {
    return (_jsx("div", { className: "pt-16", children: _jsx(TripPlanner, {}) }));
}

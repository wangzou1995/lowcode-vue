import {events, isReadOnly} from "../components/draggable/core/sortableEvents";
import {getValidSortableEntries} from "../components/draggable/core/componentBuilderHelper";
import {isHtmlAttribute} from "../components/draggable/util/tags";
import {camelize} from "../components/draggable/util/string";

function createSortableOption({ $attrs, callBackBuilder }) {
    const options = project(getValidSortableEntries($attrs));
    Object.entries(callBackBuilder).forEach(([eventType, eventBuilder]) => {
        events[eventType].forEach(event => {
            options[`on${event}`] = eventBuilder(event);
        });
    });
    const draggable = `[data-draggable]${options.draggable || ""}`;
    return {
        ...options,
        draggable
    };
}
function getValidSortableEntries(value) {
    return Object.entries(value)
        .filter(([key, _]) => !isHtmlAttribute(key))
        .map(([key, value]) => [camelize(key), value])
        .filter(([key, _]) => !isReadOnly(key));
}

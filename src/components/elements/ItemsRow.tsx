import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DeleteItems from "../btns/DeleteItems";
import { TPurchaseOrderItem } from "@/types/purchaseOrder.types";

const ItemsRow = ({
  form,
  item,
  index,
  handleRemoveItem,
}: {
  item: TPurchaseOrderItem;
  handleRemoveItem: (index: number) => void;
  index: number;
  form: UseFormReturn<any, any, undefined>;
}) => {
  return (
    <div className="flex items-baseline gap-3">
      <div className="flex relative gap-x-16">
        <FormField
          control={form.control}
          name={`item.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <FormControl>
                <Input required placeholder="Enter item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`item.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  required
                  placeholder="Enter quantity"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))} // Parse as number
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name={`item.${index}.unitPrice`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  required
                  placeholder="Enter unit price"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))} // Parse as number
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name={`item.${index}.totalPrice`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter item name"
                  {...field}
                  value={
                    form.getValues(`item.${index}.quantity`) *
                    form.getValues(`item.${index}.unitPrice`)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <DeleteItems
        className="self-end justify-self-center"
        handleRemoveItem={handleRemoveItem}
        index={index}
      />
    </div>
  );
};

export default ItemsRow;

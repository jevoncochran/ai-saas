"use client";

import { useState } from "react";
import Heading from "@/components/heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";

type Music = { userPrompt: string; music: string } | null;

const MusicPage = () => {
  const router = useRouter();

  const proModal = useProModal();

  const [music, setMusic] = useState<Music>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(null);

      const response = await axios.post("/api/music", values);

      setMusic({
        userPrompt: values.prompt,
        music: response.data.audio,
      });

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A fusion of trap hip hop and classical music"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label="No music generated" />}
          {music && (
            <div className="flex flex-col gap-y-4">
              <div className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-white border border-black/10">
                <p className="text-sm">{music.userPrompt}</p>
              </div>
              <audio controls className="w-full">
                <source src={music.music} />
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;

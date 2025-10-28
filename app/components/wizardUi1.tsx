"use client";

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import {
  wizardSystem,
  WizardStep,
  WizardNode,
  StepType,
  Wizard,
  WizardFlowOption,
} from "../../data/EssentialAiKwData";
import { useGlobalContext } from "@/lib/ContextProvider";

interface WizardUIProps {
  node?: WizardNode;
  onComplete?: (data: any) => void;
  onLoadChat?: (prompt: string) => void;
}

const buildPromptFromFormData = (data: any) => {
  let prompt = "You are Mia Mentor,  a  helpful AI assistant for new Keller Williams real estate agents. The agent has provided the following information:\n\n";
  
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      prompt += `${key}: ${data[key]}\n`;
    }
  });
  
  prompt += "\nPlease provide helpful guidance based on their responses.";
  return prompt;
};

export default function WizardUi({ onComplete, node, onLoadChat }: WizardUIProps) {
  const [currentStep, setCurrentStep] = useState<
    WizardStep | Wizard | null
  >(null);
  const [currentNode, setCurrentNode] = useState<WizardNode | null>(null);
  const [stepHistory, setStepHistory] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { globalString, setGlobalString } = useGlobalContext();


  useEffect(() => {
    console.log(globalString);
    if (globalString) {
      if (wizardSystem?.wizards?.guidance?.options?.length > 0)
        for (let key of wizardSystem?.wizards?.guidance?.options) {
          console.log("value",key.value)
          if (key.value === globalString) {
            setCurrentStep(key.node?.[globalString] ?? null);
            setCurrentNode(key.node ?? null); 
            setStepHistory([globalString]);
            return;
          }
        }
    }
    const initialWizard = wizardSystem.wizards.initial;
    setCurrentStep(initialWizard);
    setCurrentNode(null);
    setStepHistory(["initial"]);
    console.log("global string", globalString);
  }, [globalString]);

  useEffect(() => {
    if (currentStep && currentStep.type === "message" && onLoadChat && formData && Object.keys(formData).length > 0) {
      const prompt = buildPromptFromFormData(formData);
      onLoadChat(prompt);
    }
  }, [currentStep]);

  const handleOptionSelect = (option: any) => {
    if (currentStep?.type === "multiple-choice") {
      const newSelection = selectedOptions.includes(option.value)
        ? selectedOptions.filter((item) => item !== option.value)
        : [...selectedOptions, option.value];
      setSelectedOptions(newSelection);
    } else {
      setSelectedOptions([option.value]);
    }
  };

  const handleNext = () => {
    if (!currentStep) return;

    const stepData = {
      [currentStep.id]:
        currentStep.type === "multiple-choice"
          ? selectedOptions
          : currentStep.type === "input text field"
          ? inputValue
          : selectedOptions[0],
    };

    setFormData((prev: any) => ({ ...prev, ...stepData }));
    console.log("formData", formData);
    console.log("node", currentNode);

    if ('next' in currentStep && currentStep.next) {
      console.log("Current step has next:", currentStep.next);
      if (currentStep.next === "guidance") {
        console.log("Navigating to guidance wizard");
        setCurrentStep(wizardSystem.wizards.guidance);
        setStepHistory((prev) => [...prev, "guidance"]);
      } else if (currentStep.next === "end") {
        console.log("Navigating to end step");
        if (currentNode && currentNode["end"]) {
          const endStep = currentNode["end"];
          setCurrentStep(endStep);
          setStepHistory((prev) => [...prev, "end"]);
          
        } else {
          if (onComplete) {
            onComplete({ ...formData, ...stepData });
          }
          if (onLoadChat) {
            const prompt = buildPromptFromFormData({ ...formData, ...stepData });
            onLoadChat(prompt);
          }
        }
      } else if (currentNode && currentNode[currentStep.next]) {
        console.log("yello");
        setCurrentStep(currentNode[currentStep.next]);
        setStepHistory((prev) => [...prev, currentStep.next!]);
      }
    } else {
      if (selectedOptions.length > 0) {
        const selectedOption = currentStep.options?.find(
          (opt) => opt.value === selectedOptions[0]
        );
        console.log("Selected option:", selectedOption);
        if (selectedOption && selectedOption.next) {
          console.log("Selected option has next:", selectedOption.next);
          if (selectedOption.next === "guidance") {
            console.log("Navigating to guidance wizard from option");
            setCurrentStep(wizardSystem.wizards.guidance);
            setStepHistory((prev) => [...prev, "guidance"]);
          } else if (selectedOption.next === "end") {
            console.log("End of flow from option");
            if (onComplete) {
              onComplete({ ...formData, ...stepData });
            }
            if (onLoadChat) {
              const prompt = buildPromptFromFormData({ ...formData, ...stepData });
              onLoadChat(prompt);
            }
          } else {
            if (currentNode && currentNode[selectedOption.next]) {
              console.log(
                "Navigating to step in current node:",
                selectedOption.next
              );
              setCurrentStep(currentNode[selectedOption.next]);
              setStepHistory((prev) => [...prev, selectedOption.next!]);
            }
          }
        }
      }
      if (currentStep.id === "guidance" && selectedOptions.length > 0) {
        const selectedOption = currentStep.options?.find(
          (opt) => opt.value === selectedOptions[0]
        ) as WizardFlowOption | undefined;
        if (selectedOption && selectedOption.node) {
          const firstStepKey = Object.keys(selectedOption.node)[0];
          const firstStep = selectedOption.node[firstStepKey];
          setCurrentStep(firstStep);
          setCurrentNode(selectedOption.node);
          setStepHistory((prev) => [...prev, firstStepKey]);
        }
      } else {
        if (onComplete) {
          onComplete({ ...formData, ...stepData });
        }
      }
    }
    setSelectedOptions([]);
    setInputValue("");
  };

  const handlePrevious = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop();
      setStepHistory(newHistory);

      const previousStepId = newHistory[newHistory.length - 1];

      if (currentNode && currentNode[previousStepId]) {
        setCurrentStep(currentNode[previousStepId]);
        restoreStepState(previousStepId);
      } else if (previousStepId === "guidance") {
        setCurrentStep(wizardSystem.wizards.guidance);
        setCurrentNode(null);
        restoreStepState("guidance");
      } else if (previousStepId === "initial") {
        setCurrentStep(wizardSystem.wizards.initial);
        setCurrentNode(null);
        restoreStepState("initial");
      }
    }
  };

  const restoreStepState = (stepId: string) => {
    const stepData = formData[stepId];
    if (stepData) {
      if (Array.isArray(stepData)) {
        setSelectedOptions(stepData);
      } else {
        setSelectedOptions([stepData]);
      }
    } else {
      setSelectedOptions([]);
    }
    const currentStepType =
      currentNode?.[stepId]?.type ||
      wizardSystem.wizards[stepId as keyof typeof wizardSystem.wizards]?.type;
    if (currentStepType === "input text field") {
      setInputValue(stepData || "");
    } else {
      setInputValue("");
    }
  };

  const renderStepContent = () => {
    if (!currentStep) return null;

    const { type, title, description, options } = currentStep;
    const placeholder = 'placeholder' in currentStep ? currentStep.placeholder : undefined;
    const detail = 'detail' in currentStep ? currentStep.detail : undefined;

    return (
      <div className="pt-[50px] px-[50px] flex flex-col gap-[30px]">
        <h2 className="text-[22px] leading-[1.2] ">{title}</h2>

        {description && <p className="text-[16px] font-bold">{description}</p>}

        {detail && <p className="text-[14px] text-gray-600">{detail}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          {type === "single-choice" && options && (
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="option"
                    id={`option-${index}`}
                    value={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleOptionSelect(option)}
                    className="mr-3"
                  />
                  <label htmlFor={`option-${index}`} className="text-[16px]">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          {type === "multiple-choice" && options && (
            <div className="">
              {options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`option-${index}`}
                    value={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleOptionSelect(option)}
                    className="mr-3"
                  />
                  <label htmlFor={`option-${index}`} className="text-[16px]">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          {type === "dropdown" && options && (
            <select
              value={selectedOptions[0] || ""}
              onChange={(e) => setSelectedOptions([e.target.value])}
              className="border border-black w-full h-[50px] focus:outline-none px-[10px] bg-white"
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {type === "input text field" && (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder || "Enter your response..."}
              className="border border-black w-full h-[50px] focus:outline-none px-[10px] bg-white"
            />
          )}

          {type === "message" && (
            <div className="text-center py-8">
              <p className="text-[18px] text-gray-700">Loading your personalized guidance...</p>
            </div>
          )}

          <div className="mt-8">
            {type !== "message" && (
              <Button
                type="submit"
                variant="contained"
                className="font-bold! h-[50px]! w-full! bg-black! rounded-none! hover:bg-white! hover:text-black! hover:shadow-none! hover:border! border-black!"
                style={{
                  cursor:
                    ((type === "single-choice" || type === "dropdown") &&
                      selectedOptions.length === 0) ||
                    (type === "multiple-choice" &&
                      selectedOptions.length === 0) ||
                    (type === "input text field" && !inputValue.trim())
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={(e) => {
                  const isDisabled =
                    ((type === "single-choice" || type === "dropdown") &&
                      selectedOptions.length === 0) ||
                    (type === "multiple-choice" &&
                      selectedOptions.length === 0) ||
                    (type === "input text field" && !inputValue.trim());

                  if (isDisabled) {
                    e.preventDefault();
                    return;
                  }
                }}
              >
                {currentStep.id === "initial"
                  ? "Continue"
                  : ('next' in currentStep && currentStep.next)
                  ? "Continue"
                  : "Complete"}
              </Button>
            )}

            {stepHistory.length > 1 && (
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevious();
                }}
                className="text-gray-400 text-[15px] hover:underline mt-[50px] block"
              >
                go back
              </Link>
            )}
          </div>
        </form>
      </div>
    );
  };

  return <div className="w-full">{renderStepContent()}</div>;
}
